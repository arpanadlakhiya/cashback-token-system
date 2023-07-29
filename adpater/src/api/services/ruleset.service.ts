import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as dlt from "../../utils/hlfClient/hlfClient"


export const ruleSet = async (rulesetDetails: rulesetInterface.RuleSet ) => {
  try {
   await dlt.invoke
  } catch (err) {
    console.log(
      `Service register :: Failed to register user with Error: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to register user"
    );
  }
};