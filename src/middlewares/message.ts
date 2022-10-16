import type { Request, Response, NextFunction } from "express";

import { protect } from "../middlewares/auth";
import Link from "../models/link";

export const isPublic = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers["authorization"];

  const { link } = req.params;

  try {
    const getLink = await Link.findOne({ link });

    if (getLink === null) {
      return res.status(404).json({ message: "Link not found" });
    }

    if (getLink.isPublic && authHeader) {
      protect(req, res, next);
      return;
    }

    if (getLink.isPublic) {
      next();
    } else {
      protect(req, res, next);
    }
  } catch (err) {
    console.log(err);
    if (err instanceof Error) res.json({ message: err.message });
  }
};
