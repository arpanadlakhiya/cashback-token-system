import express, { Request, Response } from "express";
import * as transactionController from "../controller/transaction.controller";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as auth from "../middleware/auth.middleware";

export const transactionRouter = express.Router();

transactionRouter.use(auth.verifyToken);

transactionRouter.post(
  "/get-pre-txn-details",
  (req: Request, res: Response) => {
    (async () => {
      console.log(
        `TransactionRouter : get-pre-txn-details :: Fetching available cashback and offers: ${JSON.stringify(
          req.body
        )}`
      );

      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }

      try {
        const preTxnDetails: transactionInterface.PreTransaction = {
          value: req.body.value,
        };

        const preTxnDetailsRes = await transactionController.preTxnDetails(
          preTxnDetails,
          req.body.user
        );

        return res
          .status(preTxnDetailsRes.statusCode)
          .json(preTxnDetailsRes.httpResponseMessage);
      } catch (err) {
        console.log(
          `TransactionRouter : get-pre-txn-details :: Failed to fetch available cashback and offers :: ${err}`
        );
        return res.status(500).json({
          message: "Error occurred while fetching pre-transaction details",
        });
      }
    })();
  }
);

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
          txnId: "",
          docType: "",
          value: req.body.value,
          timeStamp: "",
          sender: req.body.sender,
          senderAddress: req.body.senderAddress,
          receiver: req.body.receiver,
          receiverAddress: "",
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

transactionRouter.get("/get-transactions", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `TransactionRouter : get-transactions :: Fetching all transactions: ${JSON.stringify(
        req.body
      )}`
    );

    try {
      const getTransactionsRes = await transactionController.getTransactions(
        req.body.user
      );

      return res
        .status(getTransactionsRes.statusCode)
        .json(getTransactionsRes.httpResponseMessage);
    } catch (err) {
      console.log(
        `TransactionRouter : get-transactions :: Failed to fetch all transactions :: ${err}`
      );
      return res.status(500).json({
        data: null,
        message: "Error occurred while fetching pre-transaction details",
        success: false
      });
    }
  })();
});
