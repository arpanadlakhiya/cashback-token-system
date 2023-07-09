import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userInterface from "../../interfaces/user.interface";
import * as batchInterface from "../../interfaces/batch.interface";
import * as batchService from "../services/batch.service";
import * as constants from "../../utils/constants";

export const batchGrow = async (
  batchGrowRequest: batchInterface.GrowBatch,
  user: userInterface.UserResponse,
) => {
  console.log(`Controller batchGrow :: Checking role of user ${user.username}`);

  if (user.role !== constants.FARMER_ROLE) {
    return HTTPResponseUtil.unauthorizedRequest("Operation not allowed!");
  }

  const batchGrowResponse = await batchService.batchGrow(batchGrowRequest);

  return batchGrowResponse
};