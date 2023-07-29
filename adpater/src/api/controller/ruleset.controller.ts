import * as rulesetService from "../services/ruleset.service";
import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as userInterface from "../../interfaces/user.interface";

export const createRuleset = async (
  ruleset: rulesetInterface.RuleSet,
  user: userInterface.User
) => {
  console.log(`RulesetController : createRuleset :: User ${user.username}`);

  const userRegister = await rulesetService.createRuleset(ruleset);

  console.log(`RulesetController : createRuleset :: Ack ${user.username}`);

  return userRegister;
};
