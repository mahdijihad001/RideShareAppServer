import { Response } from "express";

interface IMeta {
    total?: number,
    totalpage?: number;
    totalDoc?: number
}

interface IData<T> {
    success: boolean;
    statusCode: number;
    message: string;
    meta?: IMeta;
    data: T;
}


export const sendResponse = <T>(res: Response, data: IData<T>) => {
    res.status(data.statusCode).json({ success: data.success, message: data.message, meta: data.meta , data: data.data});
}