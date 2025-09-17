import { Router } from "express";
import { protect } from "../../middleware/protect";
import { Role } from "../user/user.interfaces";
import { requestValidation } from "../../utils/requestValidation";
import { createRiderRequestValidation } from "./rider.request.validation";
import { riderRequestController } from "./rider.controller";

const riderRequestRouter = Router();

riderRequestRouter.post("/request" ,  requestValidation(createRiderRequestValidation) , protect(Role.RIDER , Role.SUPER_ADMIN , Role.ADMIN) ,riderRequestController.createRiderRequest)



export default riderRequestRouter;
