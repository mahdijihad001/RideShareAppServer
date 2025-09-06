import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IActive } from "../modules/user/user.interfaces";

export const protect = (...auth: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if (!token) {
        throw new AppError(403, "Unauthoraized creadiential, Please login.");
    };

    const decodedToken = jwt.verify(token, envVars.JWT.ACCESS_SECRATE) as JwtPayload;

    if (!decodedToken) {
        throw new AppError(403, "Invalid token. Please login in again.");
    };

    const existUser = await User.findById(decodedToken.userId);

    if (!existUser) {
        throw new AppError(404, "User not found");
    };

    if (existUser.role !== decodedToken.role) {
        throw new AppError(403, "You are not authoraized.");
    };

    if(existUser.isDeleted || existUser.active === IActive.INACTIVE || existUser.active === IActive.BLOCKED){
        throw new AppError(403 , "Unauthoraized user, Contact to support team.");
    };

    if( auth.length > 0 && !auth.includes(decodedToken.role)){
        throw new AppError(400 , "You do not have permission to access this resource.");
    }

    req.authUser = existUser
    
    next();
}