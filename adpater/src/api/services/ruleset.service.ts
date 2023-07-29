import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as userInterface from "../../interfaces/user.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import { randomUUID } from "crypto";

export const createRuleset = async (
  rulesetDetails: rulesetInterface.RuleSet
) => {
  console.log(
    `RulesetService : createRuleset :: Creating ruleset for user wallet ${rulesetDetails.user_wallet}`
  );

  try {
    rulesetDetails.docType = constants.DOCTYPE_RULESET;
    rulesetDetails.ruleId = randomUUID();
    rulesetDetails.status = constants.STATUS_ACTIVE;

    await hlf.invoke(constants.contractName, constants.CREATE_RULESET, [], {
      [constants.RULESET_TRANSIENT]: Buffer.from(
        JSON.stringify(rulesetDetails)
      ),
    });

    console.log(
      `RulesetService : createRuleset :: Ruleset creation sent to chaincode with ID: ${rulesetDetails.ruleId} for user wallet ${rulesetDetails.user_wallet}`
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
  
     const invokeResponce =await hlf.invoke(
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
  
     const invokeResponce =await hlf.query(
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
export const fetchAvailableRulesets = async (
  user: userInterface.UserDetails,
  amount: number
) => {
  console.log(
    `RulesetService : fetchAvailableRulesets :: Fetching ruleset for user wallet ${user.walletAddress}`
  );

  try {
    // Fetch available cashback for userthrow new Error(`unable to fetch user details for ${user.username}`)
    const availableRulesetsBuffer = await hlf.invoke(
      constants.contractName,
      constants.QUERY_RULESETS,
      [user.walletAddress]
    );
  
    const availableRulesets = JSON.parse(availableRulesetsBuffer.toString());
  
    if (!availableRulesets) {
      return [];
    }

    let applicableRulesets: rulesetInterface.RuleSet[] = [];
    for (const rulesetStr of availableRulesets) {
      const ruleset: rulesetInterface.RuleSet = JSON.parse(rulesetStr);
      if (
        ruleset.status === constants.STATUS_ACTIVE &&
        ruleset.min_txn_limit < amount
      ) {
        applicableRulesets.push(ruleset);
      }
    }

    console.log(
      `RulesetService : fetchAvailableRulesets :: Fetched applicable rulesets for user wallet ${user.walletAddress}`
    );

    return applicableRulesets;
  } catch (err) {
    console.log(
      `RulesetService : fetchAvailableRulesets :: Failed to fetch rulesets: ${err}`
    );

    return null;
  }
};
