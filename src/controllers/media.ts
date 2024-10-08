import type { Request, Response } from "express";
import { streamFile } from "../config/media";
import { pipeline } from "stream/promises";

/**
 * @desc - get media/ stream
 * @route - GET /api/v1/media/:key
 * @access - public
 * @param req key
 * @param res buffer stream
 */
export const getFile = async (req: Request, res: Response) => {
  const { key } = req.params;
  const readStream = streamFile(`projects/kiriku/${key}`);

  res.setHeader("Content-Type", "image/jpeg");
  try {
    await pipeline(readStream, res);
  } catch (err: any) {
    res.status(err.statusCode).json({ message: err.code });
  }
};
