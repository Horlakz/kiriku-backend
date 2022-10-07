import { Secret, sign } from "jsonwebtoken";

// generate token function
export const generateToken = (id: string) =>
  sign({ id }, process.env.JWT_SECRET as Secret, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
