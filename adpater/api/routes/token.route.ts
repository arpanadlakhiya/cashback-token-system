import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as auth from "../middleware/auth.middleware";
import * as userInterface from "../../interfaces/user.interface";


export const tokenRouter = express.Router();


tokenRouter.post("/genarate-tokens", async (req: Request, res: Response) => {
    console.log(
      `Request received for genarate-tokens :: Body: ${JSON.stringify(req.body)}`
    );
  
    if (req.body.length === 0) {
      return res.status(400).json({
        message: "Invalid request body",
      });
    }
  
    try {
      const registrationRequest: userInterface.User = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: req.body.address,
        role: req.body.role,
        org: req.body.org,
      };
    
      const isRegistered = await userController.register(registrationRequest);
    
      res.status(isRegistered.statusCode).json(isRegistered.httpResponseMessage);
    } catch (err) {
      console.error(`Route register: error occurred during register: ${err.message}`);
  
      res.status(500).json({
        message: "Error occurred while registering user!",
      });
    }
  });