import type { Request, Response } from "express";

import Link from "../models/link";
import Message from "../models/message";
import { uploadFile } from "../config/media";

/**
 * @desc submits a new message
 * @route `POST` /api/v1/messages
 * @access public
 */
export const createMessage = async (req: Request, res: Response) => {
  const { message, link } = req.body;
  const { file } = req;

  try {
    // check if link exists
    const linkExists = await Link.findOne({ link });
    const upload = file && (await uploadFile(file));

    if (!linkExists) {
      res.status(404).json({ message: "Link not found" });
      return;
    }

    if (linkExists && !linkExists.isActive) {
      res.status(400).json({ message: "Link is not active" });
      return;
    }

    if (!message) {
      res.status(400).json({ message: "Message is required" });
      return;
    }

    await Message.create({
      message,
      image: upload ? upload.Key.split("/")[2] : null,
      link,
    });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
      return;
    }
  }
};

/**
 * @desc gets all messages and sort by isRead if the link is private
 * @route `GET` /api/v1/messages/:link
 * @access public | private
 */
export const getMessages = async (req: Request, res: Response) => {
  const { link } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const getLink = await Link.findOne({ link });
    const count = await Message.countDocuments({ link });
    const totalPages = Math.ceil(count / Number(limit));
    const readMessages = await Message.countDocuments({ link, isRead: true });
    const unreadMessages = await Message.countDocuments({
      link,
      isRead: false,
    });

    if (getLink === null) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (getLink) {
      if (req.user._id !== getLink.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
    }

    if (getLink.isPublic) {
      const messages = await Message.find({ link })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      res.json({
        messages,
        page,
        totalPages,
        readMessages,
        unreadMessages,
        totalMessages: count,
      });
      return;
    } else {
      const messages = await Message.find({ link })
        .sort({ isRead: 1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit));

      res.json({
        messages,
        page,
        totalPages,
        readMessages,
        unreadMessages,
        total: count,
      });
      return;
    }
  } catch (err) {
    if (err instanceof Error) res.json({ message: err.message });
  }
};

/**
 * @desc updates a message read status
 * @route `PATCH` /api/v1/messages/:id
 * @access private
 */
export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isRead } = req.body;

  try {
    const message = await Message.findById(id);

    if (message === null) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    if (isRead === undefined) {
      res.status(400).json({ message: "isRead field is required" });
      return;
    }

    await Message.findByIdAndUpdate(
      id,
      { isRead },
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Message updated successfully" });
  } catch (err) {
    if (err instanceof Error) res.json({ message: err.message });
  }
};
