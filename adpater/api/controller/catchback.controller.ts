import * as HTTPResponseUtil from "../../utils/httpResponseUtils";
import * as userInterface from "../../interfaces/user.interface";
import * as batchInterface from "../../interfaces/batch.interface";
import * as cashbackService from "../services/cashback.service";
import * as constants from "../../utils/constants";




export const GenerateCashback = async (cashBackRequest: any) => {
    console.log(`Controller GenerateCashback :: User ${JSON.stringify(cashBackRequest)}`);
  
    const cashBack = await cashbackService.GenerateCashback(cashBackRequest);
  
    return cashBack;
  };
  

  export const ClaimCashback = async (cashBackRequest: any) => {
    console.log(`Controller ClaimCashback :: User ${JSON.stringify(cashBackRequest)}`);
  
    const cashBack = await cashbackService.ClaimCashback(cashBackRequest);
  
    return cashBack;
  };

  export const CreateCashbackToken = async (cashBackRequest: any) => {
    console.log(`Controller CreateCashbackToken :: User ${JSON.stringify(cashBackRequest)}`);
  
    const cashBack = await cashbackService.CreateCashbackToken(cashBackRequest);
  
    return cashBack;
  };
  
  export const QueryCashbackToken = async (cashBackRequest: any) => {
    console.log(`Controller QueryCashbackToken :: User ${JSON.stringify(cashBackRequest)}`);
  
    const cashBack = await cashbackService.QueryCashbackToken(cashBackRequest);
  
    return cashBack;
  };
  