import * as transactionInterface from "../../interfaces/transaction.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import * as userInterface from "../../interfaces/user.interface";
import * as cashbackInterface from "../../interfaces/cashback.interface";
import { getUser } from "./user.service";
import { fetchAvailableCashback } from "./cashback.service";
import { fetchAvailableRulesets } from "./ruleset.service";

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
      throw new Error(`unable to fetch user details for ${user.username}`);
    }

    const availableCashback = await fetchAvailableCashback(
      userDetails,
      transaction.value
    );

    if (availableCashback.amount < 0) {
      throw new Error(
        `unable to fetch available cashback for ${user.username}`
      );
    }

    // Fetch available offers for user
    const applicableOffers = await fetchAvailableRulesets(
      userDetails,
      transaction.value
    );

    if (applicableOffers === null) {
      throw new Error(`unable to fetch applicable offers for ${user.username}`);
    }

    console.log(
      `TransactionService : getTransactions :: Fetched available cashback amount and applicable offers for user ${user.username}`
    );

    return HTTPResponseUtils.okResponse(
      {
        originalAmount: transaction.value,
        cashbackAmount: availableCashback.amount,
        cashbackTokenId: availableCashback.id,
        applicableOffers: applicableOffers,
      },
      `Fetched pre-transaction details for ${user.username}`,
      true
    );
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
    console.log(
      `TransactionService : simulateTransaction :: Fetching receiver wallet addres for user ${transaction.receiver}`
    );

    // Fetch user wallet
    const receiverDetails = await getUser(transaction.receiver);

    if (!receiverDetails) {
      throw new Error(`unable to fetch receiver wallet address for user ${transaction.receiver}`);
    }

    transaction.docType = constants.DOCTYPE_TXN;
    transaction.receiverAddress = receiverDetails.walletAddress;
    transaction.timeStamp = new Date().toISOString();

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

export const getTransactions = async (user: userInterface.User) => {
  console.log(
    `TransactionService : getTransactions :: Fetching all transactions for user ${user.username}`
  );

  try {
    // Fetch user wallet
    const userDetails = await getUser(user.username);

    if (!userDetails) {
      throw new Error(`unable to fetch user details for ${user.username}`);
    }

    // Fetch all transactions of user
    const transactionsBuffer = await hlf.invoke(
      constants.contractName,
      constants.QUERY_TRANSACTIONS,
      [userDetails.walletAddress]
    );

    const transactionsStr = JSON.parse(transactionsBuffer.toString());

    let transactions: transactionInterface.Transaction[];
    for (const transactionStr of transactionsStr) {
      const transaction = JSON.parse(transactionStr);
      transactions.push(transaction);
    }

    console.log(
      `TransactionService : getTransactions :: Fetched all transactions for user ${user.username}`
    );

    return HTTPResponseUtils.okResponse(
      transactions,
      `Fetched transactions for user ${user.username}`,
      true
    );
  } catch (err) {
    console.log(
      `TransactionService : getTransactions :: Failed to fetch all transactions for user: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Failed to fetch all transactions for ${user.username}`
    );
  }
};
