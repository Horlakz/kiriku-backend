import type { ErrorRequestHandler, Response, NextFunction } from "express";

const appError = (
  err: ErrorRequestHandler,
  _: any,
  res: Response,
  next: NextFunction
) => {
  console.error(
    `Error processing request ${err}. See next message for details`
  );
  console.error(err);

  res.status(500).json({ error: "internal server error" });
  next();
  process.exit(1);
};

export { appError };
