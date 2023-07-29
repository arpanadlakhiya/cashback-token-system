import * as rulesetService from "../services/ruleset.service";


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