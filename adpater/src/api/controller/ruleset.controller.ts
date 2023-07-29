import * as rulesetService from "../services/ruleset.service";
import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as userInterface from "../../interfaces/user.interface";

export const createRuleset = async (
  ruleset: rulesetInterface.RuleSet,
  user: userInterface.User
) => {
  console.log(`RulesetController : createRuleset :: User ${user.username}`);

<<<<<<< HEAD
export const setRule = async (request: any) => {
    console.log(`Controller setRule :: User ${request.username}`);
  
    const userRegister = await rulesetService.ruleSet(request);
  
    return userRegister
  };
  export const claimRuleset = async (clameRequest: any) => {
    console.log(`Controller claimRuleset :: User ${clameRequest.username}`);
  
    const userRegister = await rulesetService.clameRuleSet(clameRequest);
  
    return userRegister
  };

  export const queryRuleset = async (clameRequest: any) => {
    console.log(`Controller queryRuleset :: User ${clameRequest.username}`);
  
    const userRegister = await rulesetService.clameRuleSet(clameRequest);
  
    return userRegister
  };
=======
  const userRegister = await rulesetService.createRuleset(ruleset);

  console.log(`RulesetController : createRuleset :: Ack ${user.username}`);

  return userRegister;
};
>>>>>>> 395e1b24427a421a78199d38ac4c5e86926cfb02
