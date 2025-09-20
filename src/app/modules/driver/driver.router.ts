import { Router } from "express";
import { protect } from "../../middleware/protect";
import { Role } from "../user/user.interfaces";
import { driverController } from "./driver.controller";

const driverRouter = Router();

driverRouter.post("/accept/:id" , protect(Role.DRIVER) , driverController.acceptRequest);
driverRouter.patch("/status/:id" , protect(Role.DRIVER) , driverController.updateRideStatus);

export default driverRouter;