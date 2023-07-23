import express, { Request, Response } from "express";
import * as userController from "../controller/user.controller";
import * as batchController from "../controller/batch.controller";
import * as auth from "../middleware/auth.middleware";
import * as batchInterface from "../../interfaces/batch.interface";



export const cashbackRouter = express.Router();

cashbackRouter.post("/generate-cashback", async (req: Request, res: Response, next) => {

})
cashbackRouter.get("/cashback-value", async (req: Request, res: Response, next) => {

})
cashbackRouter.post("/generate-cashback", async (req: Request, res: Response, next) => {

})