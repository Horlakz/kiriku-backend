import bcrypt from "bcryptjs";
import type { Request, Response } from "express";

import User from "../models/user";
import { generateToken } from "../utils";

// @desc create a new user
// @route POST /user/register
// @access public
export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });

    res.status(201).json({ token: generateToken(user.id) });
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

// @desc login user
// @route POST /user/login
// @access public
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({ token: generateToken(user.id) });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    if (process.env.NODE_ENV === "development") console.log(err);
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
