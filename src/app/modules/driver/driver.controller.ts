import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { driverServices } from "./driver.services";
import { sendResponse } from "../../utils/sendResponse";

const acceptRequest = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const requestId = req.params.id;
    const driver = req.authUser._id
    const result = await driverServices.acceptRequest(requestId as string , driver);
    sendResponse(res , {
        success : true ,
        statusCode : 200,
        message : "Ride accepted",
        data : result
    })
});

const updateRideStatus = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const id = req.params.id;
    const data = req.body.status;
    const driverId = req.authUser._id;
    const result = await driverServices.updateRequestStatus(id as string, data , driverId);
    sendResponse(res , {
        success : true,
        statusCode : 200,
        message : "Request Updated success",
        data : result
    })
})

export const driverController = {
    acceptRequest,
    updateRideStatus
}