import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as userInterface from "../../interfaces/user.interface";
import * as auth from "../middleware/auth.middleware";

export const userRouter = express.Router();

userRouter.post("/register", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `UserRouter : register :: Request received for register: ${JSON.stringify(req.body)}`
    );
  
    if (req.body.length === 0) {
      return res.status(400).json({
        data: null,
        message: "Invalid request body",
        success: false
      });
    }
  
    try {
      const registrationRequest: userInterface.User = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
  
      const isRegistered = await userController.register(registrationRequest);
  
      res.status(isRegistered.statusCode).json(isRegistered.httpResponseMessage);
    } catch (err) {
      console.log(`UserRouter : register :: error occurred during register: ${err.message}`);
  
      res.status(500).json({
        data: null,
        message: "Error occurred while registering user!",
        success: false
      });
    }
  })();
});

userRouter.post("/login", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `UserRouter : login :: Request received for login: ${JSON.stringify(req.body)}`
    );
  
    if (req.body.length === 0) {
      return res.status(400).json({
        data: null,
        message: "Invalid request body",
        success: false
      });
    }
  
    try {
      const loginRequest: userInterface.LoginRequest = {
        username: req.body.username,
        password: req.body.password,
      };
  
      const loginResponse = await userController.login(loginRequest);
  
      res.status(loginResponse.statusCode).json(loginResponse.httpResponseMessage);
    } catch (err) {
      console.error(`UserRouter : login :: error occurred during login: ${err.message}`);
  
      res.status(500).json({
        data: null,
        message: "Error occurred during login!",
        success: false
      });
    }
  })();
});

userRouter.use(auth.verifyToken);

userRouter.get("/get-users", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `UserRouter : get-users :: Request received for fetching all users`
    );
  
    try {  
      const usersListRes = await userController.getUsers(req.body.user);
  
      res.status(usersListRes.statusCode).json(usersListRes.httpResponseMessage);
    } catch (err) {
      console.error(`UserRouter : get-users :: error occurred while fetching all users: ${err.message}`);
  
      res.status(500).json({
        data: null,
        message: "Error occurred while fetching all users",
        success: false
      });
    }
  })();
});

userRouter.get("/get-user/:username", (req: Request, res: Response) => {
  (async () => {
    console.log(
      `UserRouter : get-users :: Request received for fetching all users`
    );

    if (!req.params.username) {
      return res.status(400).json({
        data: null,
        message: "Username not provided",
        success: false
      });
    }

    if (req.body.user.username != req.params.username) {
      return res.status(400).json({
        data: null,
        message: "Operation forbidden",
        success: false
      });
    }
  
    try {  
      const usersListRes = await userController.getUserByName(req.body.user);
  
      res.status(usersListRes.statusCode).json(usersListRes.httpResponseMessage);
    } catch (err) {
      console.error(`UserRouter : get-users :: error occurred while fetching all users: ${err.message}`);
  
      res.status(500).json({
        data: null,
        message: "Error occurred while fetching all users",
        success: false
      });
    }
  })();
});
