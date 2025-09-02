import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";
import mongoose from "mongoose";

export const globalErrorHanle = (err: any, req: Request, res: Response, next: NextFunction) => {

    let stautsCode = 500;
    let message = `Something went worng`;
    let errorStore: any = []

    if (err instanceof ZodError) {
        const error = err.issues;

        error.forEach((issue) => {
            errorStore.push({
                path: issue.path.length > 0 ? issue.path[issue.path.length - 1] : "root",
                message: issue.message
            })
        })

        message = "Zod Error";
        stautsCode = 400;
    }
    else if (err instanceof mongoose.Error.ValidationError) {
        stautsCode = 400;

        Object.values(err.errors).forEach((error) => {
            errorStore.push({
                path: error.path,
                message: error.message
            })
        });

        message = "MongoDb validation error";

    }

    else if (err.code === 11000) {
        const match = err.message.match(/"([^"]*)"/);
        message = `${match[1]} already exist`;
        stautsCode = 400;
    } else if (err.name === "CastError") {
        message = `Invalid mongoDb object id`;
        stautsCode = 400;
    }
    else if (err instanceof AppError) {
        stautsCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        stautsCode = 500;
        message = err.message
    };

    res.status(stautsCode).json({
        success: false,
        message: message,
        errors: errorStore,
        err: envVars.DEV_ENVIRONMENT === "development" ? err : null,
        stack: envVars.DEV_ENVIRONMENT === "development" ? err.stack : null
    });

}