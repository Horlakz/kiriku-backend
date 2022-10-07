import { verify } from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import User from "../models/user";

interface JwtPayload {
  id: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  const authHeader: string | undefined = req.headers["authorization"];

  if (authHeader === undefined || authHeader === null) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (token === undefined || token === null) {
    return res.status(401).json({
      message: "Token is Missing",
    });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    if (user === null) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (err: any) {
    res.status(401).json({
      message: "Authentication Failed",
      error: err.message,
    });
  }
};
