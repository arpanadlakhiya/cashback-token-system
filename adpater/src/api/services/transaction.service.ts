import * as transactionInterface from "../../interfaces/transaction.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";

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
