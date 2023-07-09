import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as batchController from "../controller/batch.controller";
import * as auth from "../middleware/auth.middleware";
import * as batchInterface from "../../interfaces/batch.interface";

export const batchRouter = express.Router();

batchRouter.use(auth.verifyToken);

batchRouter.post("/batch-grow", async (req: Request, res: Response, next) => {
  console.log(
    `Route batchGrow :: Request received to register farmer batch :: Body: ${JSON.stringify(req.body)}`
  );

  if (req.body.length === 0) {
    return res.status(400).json({
      message: "Invalid request body",
    });
  }

  try {
    const batchGrowRequest: batchInterface.GrowBatch = {
      batchId: req.body.batchId,
      batchStatus: req.body.batchStatus,
      seedType: req.body.seedType,
      plantationDate: req.body.plantationDate,
      harvestDate: req.body.harvestDate,
      farmerName: req.body.farmerName,
      farmerAddress: req.body.farmerAddress,
      farmerContact: req.body.farmerContact,
      growingChargePerKg: req.body.growingChargePerKg,
      batchGenerationDate: req.body.batchGenerationDate,
      batchWeight: req.body.batchWeight,
      batchPrice: req.body.batchPrice,
      batchSellDate: req.body.batchSellDate,
      processorName: req.body.processorName,
      processorAddress: req.body.processorAddress,
      processorContact: req.body.processorContact
    };
  
    const batchGrowResponse = await batchController.batchGrow(
      batchGrowRequest,
      req.body.user
    );
  
    res.status(batchGrowResponse.statusCode).json(batchGrowResponse.httpResponseMessage);
  } catch (err) {
    console.error(`Route batchGrow :: error occurred during register: ${err.message}`);

    res.status(500).json({
      message: "Error occurred while storing farmer batch on ledger!",
    });
  }
});