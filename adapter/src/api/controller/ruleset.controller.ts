import * as rulesetService from "../services/ruleset.service";
import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as userInterface from "../../interfaces/user.interface";

export const createRuleset = async (
  ruleset: rulesetInterface.RuleSet,
) => {
  console.log(`RulesetController : createRuleset`);

  const createRuleset = await rulesetService.createRuleset(ruleset);

  console.log(`RulesetController : createRuleset :: Ack`);

  return createRuleset;
};

export const claimRuleset = async (clameRequest: any) => {
  console.log(`Controller claimRuleset :: User ${clameRequest.username}`);

  const claimRuleset = await rulesetService.claimRuleSet(clameRequest);

  console.log(`Controller claimRuleset :: Ack ${clameRequest.username}`);

  return claimRuleset;
};

export const fetchAllRulesets = async (user: userInterface.User) => {
  console.log(`Controller fetchAllRulesets :: User ${user.username}`);

  const fetchAllRulesets = await rulesetService.fetchAllRulesets(user);

  console.log(`Controller fetchAllRulesets :: Ack ${user.username}`);

  return fetchAllRulesets;
};
