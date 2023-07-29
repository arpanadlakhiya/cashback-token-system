import express from "express";
import * as walletController from "../controller/wallet.controller";
import * as auth from "../middleware/auth.middleware";
import * as HTTPResponseUtil from "../../utils/httpResponseUtils";

export const walletRouter = express.Router();

walletRouter.use(auth.verifyToken);

walletRouter.get("/register", (req, res, _next) => {
  (async () => {
    try {
      const response = await walletController.registerWallet(
        req.body.user
      );
    
      res.status(200).json({
        status: response ? "success" : "failed",
        error: "",
        response,
      });
    } catch (err) {
      console.log(`WalletRouter : resgiter :: Failed to register user wallet: ${err}`)

      res.status(500).json({
        status: "failed",
        error: "Failed to register user wallet"
      });
    }
  })();
});