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


export const driverController = {
    acceptRequest
}