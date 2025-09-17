import { Router } from "express";
import { userController } from "./user.controller";
import { requestValidation } from "../../utils/requestValidation";
import { createUserZodSchema } from "./user.request.validation";
import { protect } from "../../middleware/protect";

const userRouter = Router();


userRouter.post("/create", requestValidation(createUserZodSchema), userController.createUser);
userRouter.post("/login", userController.loginUser);

export default userRouter;