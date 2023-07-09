import * as batchInterface from "../../interfaces/batch.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as batchDB from "../../utils/Database/batch.database";
import * as db from "../../utils/Database/dbClient";
import * as constants from "../../utils/constants";
import * as hlfClient from "../../utils/hlfClient/hlfClient";
import * as orgUtils from "../../utils/orgUtils";

export const batchGrow = async (
  batchGrowReuquest: batchInterface.GrowBatch
) => {
  try {
    console.info(
      `Service batchGrow :: Invoking ledger to store farmer batch data with batch ID: ${batchGrowReuquest.batchId}`
    );

    const dbClient = await db.getDBClient();

    // Check if Batch ID does not already exist
    const batchExists = await batchDB.getBatchById(
      dbClient,
      batchGrowReuquest.batchId,
      constants.FARMER_BATCH_TYPE
    );

    if (batchExists.length > 0) {
      console.error(
        `Service batchGrow :: Batch already exists with ID ${batchGrowReuquest.batchId}`
      );

      return HTTPResponseUtils.internalServerErrorResponse(
        `Batch already exists with ID ${batchGrowReuquest.batchId}`
      );
    }

    // Get endorsing organizations
    const endorsingOrgs = orgUtils.getEndorsingOrgs();

    // Invoke DLT
    const dltInvokeResult = await hlfClient
      .invokeForOrganization(
        constants.contractName,
        constants.FARMER_CONTRACT_METHOD,
        [batchGrowReuquest.batchId],
        [...endorsingOrgs],
        { batch: Buffer.from(JSON.stringify(batchGrowReuquest)) }
      )
      .then((res) => {
        console.info(
          `Service batchGrow :: Farmer batch data with ID ${batchGrowReuquest.batchId} sent to ledger successfully`
        );

        return HTTPResponseUtils.okResponse(
          batchGrowReuquest.batchId,
          "Batch data with id " +
            batchGrowReuquest.batchId +
            " stored on ledger successfully!"
        );
      })
      .catch((err) => {
        console.error(
          `Service batchGrow :: Error while invoking ledger for batch ID ${batchGrowReuquest.batchId}`
        );

        return HTTPResponseUtils.internalServerErrorResponse(
          "Error while storing batch data on ledger"
        );
      });

    return dltInvokeResult;
  } catch (err) {
    console.error(
      `Service batchGrow :: Error occurred while storing batch on ledger: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Error while storing batch data of farmer on ledger!`
    );
  }
};
