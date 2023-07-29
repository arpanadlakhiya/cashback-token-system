import * as transactionService from "../services/transaction.service";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as userInterface from "../../interfaces/user.interface";

export const preTxnDetails = async (
  preTransaction: transactionInterface.PreTransaction,
  user: userInterface.User
) => {
  console.log(
    `TransactionController : preTxnDetails :: User ${user.username}`
  );

  const userRegister = await transactionService.preTxnDetails(
    preTransaction,
    user
  );

  console.log(
    `TransactionController : preTxnDetails :: Ack ${user.username}`
  );

  return userRegister;
};

export const simulateTransaction = async (
  transaction: transactionInterface.Transaction,
  user: userInterface.User,
  rulesetId: string,
  cashbackTokenId: string
) => {
  console.log(
    `TransactionController : simulateTransaction :: User ${user.username}`
  );

  const userRegister = await transactionService.simulateTransaction(
    transaction,
    rulesetId,
    cashbackTokenId
  );

  console.log(
    `TransactionController : simulateTransaction :: Ack ${user.username}`
  );

  return userRegister;
};

export const getTransactions = async (
  user: userInterface.User
) => {
  console.log(
    `TransactionController : getTransactions :: User ${user.username}`
  );

  const userRegister = await transactionService.getTransactions(
    user
  );

  console.log(
    `TransactionController : getTransactions :: Ack ${user.username}`
  );

  return userRegister;
};
