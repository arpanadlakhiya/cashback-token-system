import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userInterface from "../../interfaces/user.interface";
import * as batchInterface from "../../interfaces/batch.interface";
import * as cashbackService from "../services/cashback.service";
import * as constants from "../../utils/constants";


export const CreateRuleset = async (cashBackRequest: any) => {
    console.log(`Controller GenerateCashback :: User ${JSON.stringify(cashBackRequest)}`);
  
    const cashBack = await cashbackService.GenerateCashback(cashBackRequest);
  
    return cashBack;
  };
  