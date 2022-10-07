import type { Types } from "mongoose";
import { sign, Secret } from "jsonwebtoken";

// generate token function
export const generateToken = (id: Types.ObjectId) =>
  sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
