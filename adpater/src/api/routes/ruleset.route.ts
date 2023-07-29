import express, { Request, Response } from "express";
import * as ruleController from "../controller/ruleset.controller";


export const rulesetRouter = express.Router();


rulesetRouter.post("/create-ruleset", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `Request received for register :: Body: ${JSON.stringify(req.body)}`
    );
  
    if (req.body.length === 0) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }
  
    try {
      const ruleset = {
      //    docType
        ruleId : req.body.ruleId,
        status: req.body.status,
        min_txn_limit : req.body.min_txn_limit,
        max_cashback_limit: req.body.max_cashback_limit,
        cashback_percentage: req.body.cashback_percentage,
        creation_time: req.body.creation_time,
        expiration_time: req.body.expiration_time,
        cashback_expiration_time:   req.body.cashback_expiration_time
      }

  
      const isRuleSet = await ruleController.setRule(ruleset);
  
      res.status(isRuleSet.statusCode).json(isRuleSet.httpResponseMessage);
    } catch (err) {
      console.error(`Route register: error occurred during register: ${err.message}`);
  
      res.status(500).json({
        message: "Error occurred while registering user!",
      });
    }
  })();
});