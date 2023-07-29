import * as transactionService from "../services/transaction.service";
import * as transactionInterface from "../../interfaces/transaction.interface";
import * as userInterface from "../../interfaces/user.interface";

export const simulateTransaction = async (
  transaction: transactionInterface.Transaction,
  user: userInterface.User
) => {
    console.log(`TransactionController : simulateTransaction :: User ${user}`);
  
    const userRegister = await transactionService.simulateTransaction(transaction);
  
    return userRegister
  };