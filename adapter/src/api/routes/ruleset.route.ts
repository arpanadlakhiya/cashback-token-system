import express, { Request, Response } from "express";
import * as ruleController from "../controller/ruleset.controller";
import * as rulesetInterface from "../../interfaces/ruleset.interface";
import * as auth from "../middleware/auth.middleware";

export const rulesetRouter = express.Router();

rulesetRouter.post("/create-ruleset", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `RulesetRouter : create-ruleset :: Request received for register: ${JSON.stringify(
        req.body
      )}`
    );

    if (req.body.length === 0) {
      return res.status(400).json({
        data: null,
        message: "Invalid request body",
        success: false
      });
    }

    try {
      const ruleset: rulesetInterface.RuleSet = {
        docType: "",
        ruleId: "",
        status: "",
        min_txn_limit: req.body.min_txn_limit,
        max_cashback_limit: req.body.max_cashback_limit,
        cashback_percentage: req.body.cashback_percentage,
        creation_time: req.body.creation_time,
        expiration_time: req.body.expiration_time,
        cashback_expiration_time: req.body.cashback_expiration_time,
        user_wallet: req.body.user_wallet,
      };

      const response = await ruleController.createRuleset(
        ruleset
      );

      res.status(response.statusCode).json(response.httpResponseMessage);
    } catch (err) {
      console.error(
        `RulesetRouter : create-ruleset :: error occurred while creating ruleset: ${err.message}`
      );

      res.status(500).json({
        data: null,
        message: "Error occurred while creating ruleset",
        success: false
      });
    }
  })();
});

rulesetRouter.use(auth.verifyToken);

rulesetRouter.post("/claim-ruleset", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `RulesetRouter : claim-ruleset :: Request received for claimRuleset: ${JSON.stringify(req.body)}`
    );

    if (req.body.length === 0) {
      return res.status(400).json({
        data: null,
        message: "Invalid request body",
        success: false
      });
    }

    try {
      console.log(req.body);
      const claimruleset = {
        transactionId: req.body.transactionId,
        rulesetId: req.body.rulesetId,
      };

      const isRuleSetClamed = await ruleController.claimRuleset(claimruleset);

      res
        .status(isRuleSetClamed.statusCode)
        .json(isRuleSetClamed.httpResponseMessage);
    } catch (err) {
      console.error(
        `RulesetRouter : claim-ruleset :: error occurred during claimRuleset: ${err.message}`
      );

      res.status(500).json({
        data: null,
        message: "Error occurred while claiming offer!",
        success: false
      });
    }
  })();
});

rulesetRouter.get("/get-rulesets", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `RulesetRouter : get-rulesets :: Request received to get all rulesets :: Body: ${JSON.stringify(req.body)}`
    );

    try {
      const fetchRulesetsRes = await ruleController.fetchAllRulesets(req.body.user);

      res
        .status(fetchRulesetsRes.statusCode)
        .json(fetchRulesetsRes.httpResponseMessage);
    } catch (err) {
      console.error(
        `RulesetRouter : get-rulesets :: error occurred while fetching all rulesets: ${err.message}`
      );

      res.status(500).json({
        data: null,
        message: "Error occurred while fetching offers!",
        success: false
      });
    }
  })();
});
