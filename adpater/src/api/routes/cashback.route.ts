import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as auth from "../middleware/auth.middleware";
import * as batchInterface from "../../interfaces/batch.interface";



export const cashbackRouter = express.Router();

cashbackRouter.post("/generate-cashback", (req: Request, res: Response, next) => {

})
cashbackRouter.get("/cashback-value", (req: Request, res: Response, next) => {

})
cashbackRouter.post("/generate-cashback", (req: Request, res: Response, next) => {

})