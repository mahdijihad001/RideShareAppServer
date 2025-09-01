import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const requestValidation = (zodSchema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {

    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data)
        } catch (error) {
            return res.status(400).json({ success: false, message: "Invalid data formate" });
        }
    }
    req.body = zodSchema.parseAsync(req.body);
    next();
}