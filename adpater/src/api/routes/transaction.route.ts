import express, { Request, Response } from "express";
import * as transactionController from "../controller/transaction.controller";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as auth from "../middleware/auth.middleware";

export const transactionRouter = express.Router();

transactionRouter.post("/simulate-transaction", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `Request received for simulating transaction :: Body: ${JSON.stringify(req.body)}`
    );

    if (req.body.length === 0) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    try {

    }
  })();
});