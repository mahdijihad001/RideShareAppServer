import { Router } from "express";
import { userController } from "./user.controller";
import { requestValidation } from "../../utils/requestValidation";
import { createUserZodSchema } from "./user.request.validation";

const userRouter = Router();


userRouter.post("/create", requestValidation(createUserZodSchema), userController.createUser);


export default userRouter;