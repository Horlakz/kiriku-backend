import type { Request, Response } from "express";

import Link from "../models/link";

/**
 * @desc create a new link
 * @route `POST` /api/v1/links
 * @access private
 */
export const createLink = async (req: Request, res: Response) => {
  // get inputs
  const { description, isPublic } = req.body;

  try {
    const newLink = await Link.create({
      user: req.user._id,
      description,
      isPublic,
    });

    // send response
    res.status(201).json(newLink.link);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 * @desc get all links
 * @route GET /api/v1/links
 * @access private
 */
export const getLinks = async (req: Request, res: Response) => {
  try {
    const links = await Link.find({ user: req.user._id });

    // send response
    res.status(200).json(links);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 * @desc get link details
 * @route GET /api/v1/links/:link
 * @access public
 * @param req link
 */
export const getLink = async (req: Request, res: Response) => {
  try {
    const link = await Link.findOne({ link: req.params.link });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // send response
    res.status(200).json(link);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 * @desc update link details
 * @route PUT /api/v1/links/:link
 * @access private
 * @param req link
 */
export const updateLink = async (req: Request, res: Response) => {
  try {
    const link = await Link.findOneAndUpdate(
      { link: req.params.link, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // send response
    res.status(200).json(link);
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};

/**
 * @desc delete link
 * @route DELETE /api/v1/links/:link
 * @access private
 * @param req link
 */
export const deleteLink = async (req: Request, res: Response) => {
  try {
    const link = await Link.findOneAndDelete({
      link: req.params.link,
      user: req.user._id,
    });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // send response
    res.status(200).json({ message: "Link deleted" });
  } catch (err) {
    if (err instanceof Error) res.status(400).json({ message: err.message });
  }
};
