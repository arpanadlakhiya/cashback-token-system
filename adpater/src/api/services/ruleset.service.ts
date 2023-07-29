import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as dlt from "../../utils/hlfClient/hlfClient"


export const ruleSet = async (rulesetDetails: rulesetInterface.ruleSet ) => {
  try {

   const invokeResponce =await dlt.invoke(
            "CashbackContract",
            "CreateRuleset",
            [],
            Buffer.from(JSON.stringify(rulesetDetails))
        )
    return HTTPResponseUtils.okResponse(invokeResponce)
  } catch (err) {
    console.log(
      `Service ruleSet :: Failed to ruleSet user with Error: ${err}`
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