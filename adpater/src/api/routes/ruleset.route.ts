import express, { Request, Response } from "express";
import * as ruleController from "../controller/ruleset.controller";
import * as rulesetInterface from "../../interfaces/ruleset.interface";

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
        message: "Invalid request body",
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
        user_wallet: req.body.user_wallet
      };

      const response = await ruleController.createRuleset(
        ruleset,
        req.body.user
      );

      res.status(response.statusCode).json(response.httpResponseMessage);
    } catch (err) {
      console.error(
        `RulesetRouter : create-ruleset :: error occurred while creating ruleset: ${err.message}`
      );

      res.status(500).json({
        message: "Error occurred while creating ruleset",
      });
    }
  })();
});


  rulesetRouter.post("/claimRuleset", async (req: Request, res: Response) => {
    console.log(
      `Request received for claimRuleset :: Body: ${JSON.stringify(req.body)}`
    );

    if (req.body.length === 0) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }

    try {
    console.log(req.body);
    const claimruleset = {
        transactionId: req.body.transactionId,
        rulesetId: req.body.rulesetId,
    }

  
      const isRuleSetClamed = await ruleController.claimRuleset(claimruleset);
  
      res.status(isRuleSetClamed.statusCode).json(isRuleSetClamed.httpResponseMessage);
    } catch (err) {
      console.error(`Route register: error occurred during claimRuleset: ${err.message}`);
  
      res.status(500).json({
        message: "Error occurred while claimRuleset!",
      });
    }
  });


  rulesetRouter.get("/queryRuleset", async (req: Request, res: Response) => {
    console.log(
      `Request received for queryRuleset :: Body: ${JSON.stringify(req.body)}`
    );
  

    try {
    console.log(req.query);
    const queryId = req.query.queryId

  
      const isRuleSetClamed = await ruleController.queryRuleset(queryId);
  
      res.status(isRuleSetClamed.statusCode).json(isRuleSetClamed.httpResponseMessage);
    } catch (err) {
      console.error(`Route register: error occurred during queryRuleset: ${err.message}`);
  
      res.status(500).json({
        message: "Error occurred while queryRuleset!",
      });
    }
  });
