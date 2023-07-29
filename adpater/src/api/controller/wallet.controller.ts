
import * as walletService from "../services/wallet.service";
import * as walletInterface from "../../interfaces/wallet.interface";
import * as userInterface from "../../interfaces/user.interface";
import * as HTTPResponseUtil from "../../utils/httpResponseUtils";

export const registerWallet = async (
  user: userInterface.User
) => {
  console.log(`WalletController : registerWallet :: User ${user.username}`);

  if (!user.username) {
    return HTTPResponseUtil.forbiddenRequest("User not logged in");
  }

  const registerWalletToLedgerData = await walletService.registerWallet(
    user
  );

  console.log(`WalletController : registerWallet :: Ack ${user.username}`);

  return registerWalletToLedgerData;
};


