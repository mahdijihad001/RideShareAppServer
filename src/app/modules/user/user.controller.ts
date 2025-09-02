import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUser(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User created Successfully",
        data: result.user
    });
});


export const userController = {
    createUser
}