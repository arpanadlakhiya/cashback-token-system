import * as rulesetService from "../services/ruleset.service";


export const setRule = async (registrationRequest: any) => {
    console.log(`Controller register :: User ${registrationRequest.username}`);
  
    const userRegister = await rulesetService.ruleSet(registrationRequest);
  
    return userRegister
  };