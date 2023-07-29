import express, { Request, Response } from "express";
import * as transactionController from "../controller/transaction.controller";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as auth from "../middleware/auth.middleware";
import * as constants from "../../utils/constants";

export const transactionRouter = express.Router();

transactionRouter.post(
  "/simulate-transaction",
  (req: Request, res: Response) => {
    (async () => {
      console.log(
        `TransactionRouter : simulate-transaction :: Request received to simulate transaction ${JSON.stringify(
          req.body
        )}`
      );

      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }

      try {
        const transaction: transactionInterface.Transaction = {
          txnId: req.body.txnId,
          docType: req.body.docType,
          value: req.body.value,
          timeStamp: req.body.timeStamp,
          senderAddress: req.body.senderAddress,
          receiverAddress: req.body.receiverAddress,
          cashbackUsedValue: req.body.cashbackUsedValue,
        };

        const simulateTxnRes = await transactionController.simulateTransaction(
          transaction,
          req.body.user,
          req.body.rulesetId,
          req.body.cashbackTokenId
        );

        return res
          .status(simulateTxnRes.statusCode)
          .json(simulateTxnRes.httpResponseMessage);
      } catch (err) {
        console.log(
          `TransactionRouter : simulate-transaction :: Failed to simulate transaction :: ${err}`
        );
        return res.status(500).json({
          message: "Error occurred while simulating transaction",
        });
      }
    })();
  }
);
