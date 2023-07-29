import * as userInterface from "../../interfaces/user.interface";
import * as HTTPResponseUtils from "../../utils/httpResponseUtils";


export const ruleSet = async (rulesetDetails: userInterface.User) => {
  try {
   
  } catch (err) {
    console.log(
      `Service register :: Failed to register user with Error: ${err}`
    );

    return HTTPResponseUtils.internalServerErrorResponse(
      "Failed to register user"
    );
  }
};