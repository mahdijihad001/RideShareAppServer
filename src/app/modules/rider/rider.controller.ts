import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/CatchAsync"
import { riderRequestServices } from "./rider.servecies";
import { sendResponse } from "../../utils/sendResponse";
import { RiderRequest } from "./rider.model";
import { AppError } from "../../utils/AppError";
import { IStatus } from "./rider.interfaces";

const createRiderRequest = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const riderId = req.authUser._id;
     
    const payload ={
        rider : riderId,
        ...req.body
    };


    const result = await riderRequestServices.createRiderRequest(payload);

    sendResponse(res , {
        statusCode : 200,
        success : true,
        message : "Rider request taken suuessfully!",
        data : result
    });

});

const cancleRiderRequest = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    const id = req.params.id
   
})

export const riderRequestController ={
    createRiderRequest
}