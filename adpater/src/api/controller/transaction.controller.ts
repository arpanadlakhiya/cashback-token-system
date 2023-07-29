import * as transactionService from "../services/transaction.service";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as userInterface from "../../interfaces/user.interface";

export const simulateTransaction = async (
  transaction: transactionInterface.Transaction,
  user: userInterface.User,
  rulesetId: string,
  cashbackTokenId: string
) => {
    console.log(`TransactionController : simulateTransaction :: User ${user.username}`);
  
    const userRegister = await transactionService.simulateTransaction(
      transaction,
      rulesetId,
      cashbackTokenId
    );
  
    console.log(`TransactionController : simulateTransaction :: Ack ${user.username}`);

    return userRegister;
  };