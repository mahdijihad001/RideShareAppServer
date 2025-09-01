import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { AppError } from "../utils/AppError";
import { ZodError } from "zod";

export const globalErrorHanle = (err: any, req: Request, res: Response, next: NextFunction) => {

    let stautsCode = 500;
    let message = `Something went worng`;
    let errorStore = []

    if (err instanceof ZodError) {
        const error = err.issues;

        error.forEach((issue) => {
            errorStore.push({
                path: issue.path[issue.path.length - 1],
                message: issue.message
            })
        })

        message = "Zod Error";
        stautsCode = 400;
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

    res.status(stautsCode).json({ success: false, message: message, err: envVars.DEV_ENVIRONMENT === "development" ? err : null, stack: envVars.DEV_ENVIRONMENT === "development" ? err.stack : null });

}