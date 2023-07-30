import * as HTTPResponseUtils from "../../utils/httpResponseUtils";
import * as hlf from "../../utils/hlfClient/hlfClient";
import * as constants from "../../utils/constants";
import * as userInterface from "../../interfaces/user.interface";
import * as cashbackInterface from "../../interfaces/cashback.interface";

export const fetchAvailableCashback = async (
  user: userInterface.UserDetails,
  amount: number
) => {
  try {
    console.log(
      `CashbackService : fetchAvailableCashback :: Fetching available cashback tokens of user ${user.username} for amount ${amount}`
    );
  
    // Fetch available cashback for user
    const availableCashbackTokensBuffer = await hlf.invoke(
      constants.contractName,
      constants.QUERY_CASHBACK_TOKENS,
      [user.walletAddress]
    );
  
    const availableCashbackTokens = JSON.parse(availableCashbackTokensBuffer.toString());
  
    if (!availableCashbackTokens) {
      return {
        amount: 0,
        id: ""
      };
    }
  
    let availableCashbackAmount = 0;
    let cashbackTokenId = "";
    for (const tokenStr of availableCashbackTokens) {
      const token: cashbackInterface.CashbackDetails = JSON.parse(tokenStr);
      if (token.value > availableCashbackAmount && token.value < amount) {
        availableCashbackAmount = token.value
        cashbackTokenId = token.id
      }
    }
  
    console.log(
      `CashbackService : fetchAvailableCashback :: Available cashback for user ${user.username} is ${availableCashbackAmount}`
    );

    return {
      amount: availableCashbackAmount,
      id: cashbackTokenId
    };
  } catch (err) {
    console.log(
      `CashbackService : fetchAvailableCashback :: error while fetching available cashback for user ${user.username} for amount ${amount}: ${err}`
    );

    return {
      amount: -1,
      id: ""
    };
  }
}

export const fetchAllCashback = async (
  user: userInterface.UserDetails
) => {
  try {
    console.log(
      `CashbackService : fetchAllCashback :: Fetching all cashback tokens of user ${user.username}`
    );
  
    // Fetch available cashback for user
    const availableCashbackTokensBuffer = await hlf.invoke(
      constants.contractName,
      constants.QUERY_CASHBACK_TOKENS,
      [user.walletAddress]
    );
  
    const availableCashbackTokens = JSON.parse(availableCashbackTokensBuffer.toString());
  
    let availableCashback: cashbackInterface.AllCashback = {
      totalAmount: 0,
      cashbackTokens: [],
    };

    if (!availableCashbackTokens) {
      return availableCashback;
    }
  
    for (const tokenStr of availableCashbackTokens) {
      const token: cashbackInterface.CashbackDetails = JSON.parse(tokenStr);
      availableCashback.totalAmount += token.value;
      availableCashback.cashbackTokens.push({
        id: token.id,
        value: token.value
      });
    }
  
    console.log(
      `CashbackService : fetchAllCashback :: Fetched all cashback tokens for user ${user.username}, total cashback with user: ${availableCashback.totalAmount}`
    );

    return availableCashback;
  } catch (err) {
    console.log(
      `CashbackService : fetchAllCashback :: error while fetching available cashback for user ${user.username}: ${err}`
    );

    return null;
  }
}
