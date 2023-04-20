import type { Request, Response } from "express";

import Form from "../models/form";

/**
 * @desc submits a new form
 * @route `POST` /api/v1/form
 * @access public
 * @param {string} name
 * @param {string} email
 * @param {string} message
 */
export const createForm = async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  try {
    await Form.create({ name, email, message });

    res.status(201).json({ message: "Form submitted successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
  }
};

/**
 * @desc get all forms
 * @route GET /api/v1/form
 * @access private
 */
export const getForms = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const total = await Form.countDocuments();

    const forms = await Form.find()
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      forms,
      total,
      pages: Math.ceil(total / Number(limit)),
      page: Number(page),
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
  }
};
