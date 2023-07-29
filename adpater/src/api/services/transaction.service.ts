import * as transactionInterface from "../../interfaces/transaction.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import * as userInterface from "../../interfaces/user.interface";
import * as cashbackInterface from "../../interfaces/cashback.interface";
import { getUser } from "./user.service";

export const preTxnDetails = async (
  transaction: transactionInterface.PreTransaction,
  user: userInterface.User
) => {
  console.log(
    `TransactionService : preTxnDetails :: Fetching pre-transaction details for user ${user.username} and amount ${transaction.value}`
  );

  try {
    // Fetch user wallet
    const userDetails = await getUser(user.username);

    if (!userDetails) {
      throw new Error(`unable to fetch user details for ${user.username}`)
    }

    console.log(
      `TransactionService : preTxnDetails :: Fetching available cashback tokens of user ${user.username}`
    );

    // Fetch available cashback for user
    const availableCashbackTokens = await hlf.invoke(
      constants.contractName,
      constants.QUERY_CASHBACK_TOKENS,
      [userDetails.walletAddress]
    );

    if (!availableCashbackTokens) {
      throw new Error(`error while fetching available cashback for user ${user.username}`)
    }

    let availableCashbackAmount = 0;
    for (const tokenStr of availableCashbackTokens) {
      const token: cashbackInterface.CashbackDetails = JSON.parse(tokenStr.toString());
      if (token.value > availableCashbackAmount) {
        availableCashbackAmount = token.value
      }
    }

    console.log(
      `TransactionService : preTxnDetails :: Available cashback for user ${user.username} is ${availableCashbackAmount}`
    );


    // Fetch available offers for user
  } catch (err) {
    console.log(
      `TransactionService : preTxnDetails :: Failed to fetch pre-transaction details: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to fetch pre-transaction details"
    );
  }
};

export const simulateTransaction = async (
  transaction: transactionInterface.Transaction,
  rulesetId: string,
  cashbackTokenId: string
) => {
  console.log(
    `TransactionService : simulateTransaction :: Simulating transaction ${transaction}`
  );

  try {
    await hlf.invoke(
      constants.contractName,
      constants.SIMULATE_TRANSACTION,
      [rulesetId, cashbackTokenId],
      {
        [constants.TXN_TRANSIENT]: Buffer.from(JSON.stringify(transaction)),
      }
    );

    console.log(
      `TransactionService : simulateTransaction :: Transaction sent to chaincode`
    );

    return HTTPResponseUtils.okResponse(
      transaction,
      "Simulated transaction successfully",
      true
    );
  } catch (err) {
    console.log(
      `TransactionService : simulateTransaction :: Failed to send transaction to chaincode: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to simulate transaction"
    );
  }
};
