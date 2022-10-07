import express from "express";

import { User } from "../models/user";

declare global {
  namespace Express {
    interface Request {
      user?: Record<User>;
      file?: Record<File>;
    }
  }
}
