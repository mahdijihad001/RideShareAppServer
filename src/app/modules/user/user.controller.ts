import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { userServices } from "./user.services";
import { sendResponse } from "../../utils/sendResponse";
import { AppError } from "../../utils/AppError";

const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const result = await userServices.createUser(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User created Successfully",
        data: result.user
    });
});


const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.email || !req.body.password) {
        throw new AppError(400, "Email & password must be required");
    };

    const result = await userServices.loginUser(req.body);

    res.cookie("accessToken", result.token.accessToken, { secure: false, httpOnly: true });
    res.cookie("refreshToken", result.token.refreshToken, { secure: false, httpOnly: true });
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User successfully login",
        data: result.user
    })
});

const viewAllUser = catchAsync(async(req : Request , res : Response , next : NextFunction) =>{
    
})

export const userController = {
    createUser,
    loginUser
};