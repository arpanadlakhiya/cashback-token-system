import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as userInterface from "../../interfaces/user.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import { randomUUID } from "crypto";
import { getUser } from "./user.service";

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

export const claimRuleSet = async (
  rulesetDetails: rulesetInterface.claimRuleset
) => {
  try {
    const invokeResponce = await hlf.invoke(
      "CashbackContract",
      "ClaimRuleset",
      [rulesetDetails.transactionId, rulesetDetails.rulesetId]
    );
    return HTTPResponseUtils.okResponse(invokeResponce);
  } catch (err) {
    console.log(
      `Service register :: Failed to claimRuleSet  with Error: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to claimRuleSet user"
    );
  }
};

export const fetchAllRulesets = async (user: userInterface.User) => {
  console.log(
    `RulesetService : fetchAllRulesets :: Fetching all rulesets for user ${user.username}`
  );

  try {
    // Fetch user wallet
    const userDetails = await getUser(user.username);

    if (!userDetails) {
      throw new Error(`unable to fetch user details for ${user.username}`);
    }

    // Fetch available cashback for userthrow new Error(`unable to fetch user details for ${user.username}`)
    const allRulesetsBuffer = await hlf.invoke(
      constants.contractName,
      constants.QUERY_RULESETS,
      [userDetails.walletAddress]
    );

    const allRulesetsStr = JSON.parse(allRulesetsBuffer.toString());

    let allRulesets: rulesetInterface.RuleSet[] = [];
    
    if (!allRulesetsStr) {
      return HTTPResponseUtils.okResponse(
        allRulesets,
        `Fetched all offers for user ${user.username}`,
        true
      );
    }

    for (const rulesetStr of allRulesetsStr) {
      const ruleset: rulesetInterface.RuleSet = JSON.parse(rulesetStr);
      allRulesets.push(ruleset);
    }

    console.log(
      `RulesetService : fetchAllRulesets :: Fetched all rulesets for user ${user.username}`
    );

    return HTTPResponseUtils.okResponse(
      allRulesets,
      `Fetched all offers for user ${user.username}`,
      true
    );
  } catch (err) {
    console.log(
      `RulesetService : fetchAllRulesets :: Failed to fetch all rulesets for user ${user.username}: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      `Unable to fetch all offers for user ${user.username}`
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
