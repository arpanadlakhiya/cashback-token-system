import express, { Request, Response } from "express";

export const genericRouter = express.Router();

genericRouter.get("/", (req: Request, res: Response, next) => {
  res.status(200).json({
    message: "Server is up and running"
  });
});