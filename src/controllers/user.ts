import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import sendEmail from "../config/email";
import Code from "../models/code";
import User from "../models/user";
import { generateToken } from "../utils";

/**
 *
 * @desc create user
 * @route /auth/register
 * @method POST
 * @access Public
 */
export const register = async (req: Request, res: Response) => {
  // get inputs
  const { name, email, password } = req.body;

  try {
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    const user = await User.create({ name, email, password });

    // send response
    res.status(201).json({
      token: generateToken(user._id),
    });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 *
 * @desc login user
 * @route /auth/login
 * @method POST
 * @access Public
 */
export const login = async (req: Request, res: Response) => {
  // get inputs
  const { email, password } = req.body;

  try {
    // match user
    const user = await User.findOne({ email });

    // match password
    const isMatch = user && (await bcrypt.compare(password, user.password));

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // send response
    isMatch &&
      res.status(200).json({
        token: generateToken(user._id),
      });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
/**
 * @desc get user
 * @route /auth/me
 * @method GET
 * @access Private
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    // const user = await User.findById(req.user.id);
    res.status(200).json(req.user);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 *
 * @desc send code to reset password
 * @route /auth/forgot-password
 * @method POST
 * @access Public
 */
export const forgotPassword = async (req: Request, res: Response) => {
  // get inputs
  const { email } = req.body;

  // generate 6 digit code
  const code = Math.floor(Math.random() * 900000) + 100000;

  const html = `
      <h1>Reset Password</h1>
      <p>You requested to reset your password. The code is ${code}</p>
    `;

  try {
    if (!email) {
      res.status(400).json({ message: "Email Field is empty" });
      return;
    }

    // match user
    const user = await User.findOne({ email });

    if (user === null || user === undefined) {
      res.status(400).json({ message: "Email is not registered" });
      return;
    }

    // if code exists, update it
    const codeExists = user && (await Code.findOne({ user: user._id }));
    if (codeExists) {
      // update code
      await Code.findOneAndUpdate({ user: user._id }, { code });

      // resend code email
      sendEmail(email, "Reset Password", html);

      res.status(200).json({ message: "Code has been resent to email" });
      return;
    }

    // send code to email
    sendEmail(email, "Reset Password", html);

    // save code to database
    user && (await Code.create({ user: user._id, code }));

    // send response
    res.status(200).json({ message: "Code has been send to email" });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 *
 * @desc use code to reset password
 * @route /auth/reset-password
 * @method PUT
 * @access Public
 */
export const resetPassword = async (req: Request, res: Response) => {
  // get inputs
  const { email, code, password } = req.body;

  try {
    if (!email || !code || !password) {
      res.status(400).json({ message: "Field(s) are empty" });
      return;
    }

    // match user
    const user = await User.findOne({ email });

    if (user === null || user === undefined) {
      res.status(400).json({
        message: "Email is not registered",
      });
      return;
    }

    if (user) {
      const codeExists = await Code.findOne({ user: user._id });

      if (!codeExists) {
        res.status(400).json({
          message: "Code does not exist",
        });
        return;
      }

      if (codeExists) {
        if (codeExists.code !== code) {
          res.status(400).json({
            message: "Invalid code",
          });
          return;
        }

        // update password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, { password: hash });

        // remove code
        await Code.findOneAndRemove({ user: user._id });

        // send response
        res.status(200).json({ message: "Password reset successful" });
      }
    }
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
