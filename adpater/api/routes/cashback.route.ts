import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as batchController from "../controller/batch.controller";
import * as auth from "../middleware/auth.middleware";
import * as batchInterface from "../../interfaces/batch.interface";



export const cashbackRouter = express.Router();

cashbackRouter.post("/generate-cashback", async (req: Request, res: Response, next) => {
    console.log(
        `Request received for cashback :: Body: ${JSON.stringify(req.body)}`
      );
    
      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
    
      try {
        const response = await userController.login(req.body);
      
        res.status(response.statusCode).json(response.httpResponseMessage);
      } catch (err) {
        console.error(`Route cashback: error occurred during login: ${err.message}`);
    
        res.status(500).json({
          message: "Error occurred during cashback",
        });
      }
})
cashbackRouter.post("/claim-cashback", async (req: Request, res: Response, next) => {
    console.log(
        `Request received for cashback :: Body: ${JSON.stringify(req.body)}`
      );
    
      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
    
      try {
        const response = await userController.login(req.body);
      
        res.status(response.statusCode).json(response.httpResponseMessage);
      } catch (err) {
        console.error(`Route cashback: error occurred during login: ${err.message}`);
    
        res.status(500).json({
          message: "Error occurred during cashback",
        });
      }
})
cashbackRouter.post("/create-cashback-token", async (req: Request, res: Response, next) => {

    console.log(
        `Request received for cashback :: Body: ${JSON.stringify(req.body)}`
      );
    
      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
    
      try {
        const response = await userController.login(req.body);
      
        res.status(response.statusCode).json(response.httpResponseMessage);
      } catch (err) {
        console.error(`Route cashback: error occurred during login: ${err.message}`);
    
        res.status(500).json({
          message: "Error occurred during cashback",
        });
      }
})
cashbackRouter.get("/query-cashback", async (req: Request, res: Response, next) => {
    console.log(
        `Request received for cashback :: Body: ${JSON.stringify(req.body)}`
      );
    
      if (req.body.length === 0) {
        return res.status(400).json({
          message: "Invalid request body",
        });
      }
    
      try {
        const response = await userController.login(req.body);
      
        res.status(response.statusCode).json(response.httpResponseMessage);
      } catch (err) {
        console.error(`Route cashback: error occurred during login: ${err.message}`);
    
        res.status(500).json({
          message: "Error occurred during cashback",
        });
      }
})