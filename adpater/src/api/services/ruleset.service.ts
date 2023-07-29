import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as dlt from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import { randomUUID } from "crypto";

export const createRuleset = async (
  rulesetDetails: rulesetInterface.RuleSet
) => {
  console.log(
    `RulesetService : createRuleset :: Creating ruleset`
  );

  try {
    rulesetDetails.docType = constants.DOCTYPE_RULESET;
    rulesetDetails.ruleId = randomUUID();
    rulesetDetails.status = constants.STATUS_ACTIVE;

    await dlt.invoke(
      constants.contractName,
      constants.CREATE_RULESET,
      [],
      {
        [constants.RULESET_TRANSIENT]: Buffer.from(JSON.stringify(rulesetDetails))
      }
    );

    console.log(
      `RulesetService : createRuleset :: Ruleset creation sent to chaincode with ID: ${rulesetDetails.ruleId}`
    );

    return HTTPResponseUtils.okResponse(
      rulesetDetails,
      "Created ruleset successfully",
      true
    );
  } catch (err) {
    console.log(
      `RulesetService : createRuleset :: Failed to create ruleset: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to ruleSet user"
    );
  }
};

export const clameRuleSet = async (rulesetDetails: rulesetInterface.claimRuleset ) => {
    try {
  
     const invokeResponce =await dlt.invoke(
              "CashbackContract",
              "ClaimRuleset",
              [rulesetDetails.transactionId, rulesetDetails.rulesetId],
          )
      return HTTPResponseUtils.okResponse(invokeResponce)
    } catch (err) {
      console.log(
        `Service register :: Failed to clameRuleSet  with Error: ${err}`
      );
  
      return HTTPResponseUtils.internalServerErrorResponse(
        "Failed to clameRuleSet user"
      );
    }
  };

  export const queryRuleset = async (queryId: string ) => {
    try {
  
     const invokeResponce =await dlt.query(
              "CashbackContract",
              "QueryRuleset",
              [queryId],
          )
      return HTTPResponseUtils.okResponse(invokeResponce)
    } catch (err) {
      console.log(
        `Service register :: Failed to clameRuleSet  with Error: ${err}`
      );
  
      return HTTPResponseUtils.internalServerErrorResponse(
        "Failed to clameRuleSet user"
      );
    }
  };
