import * as rulesetService from "../services/ruleset.service";

export const createRuleset = async (registrationRequest: any) => {
  console.log(
    `RulesetController : createRuleset :: User ${registrationRequest.username}`
  );

  const userRegister = await rulesetService.ruleSet(registrationRequest);

  console.log(
    `RulesetController : createRuleset :: Ack ${registrationRequest.username}`
  );

  return userRegister;
};
