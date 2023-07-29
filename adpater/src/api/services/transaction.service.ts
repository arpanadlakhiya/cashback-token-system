import * as transactionInterface from "../../interfaces/transaction.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as dlt from "../../utils/hlfClient/hlfClient"


export const simulateTransaction = async (
  transaction: transactionInterface.Transaction
) => {
  console.log(
    `TransactionService : simulateTransaction :: Simulating transaction ${transaction}`
  );

  try {
    //  await dlt.invoke
    return HTTPResponseUtils.okResponse(
      transaction,
      "Simulated transaction successfully",
      true
    );
  } catch (err) {
    console.log(
      `TransactionService : simulateTransaction :: Failed to simulate transaction: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to register user"
    );
  }
};