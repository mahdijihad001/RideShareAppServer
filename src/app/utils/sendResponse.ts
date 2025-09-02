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
    data: T,
    meta?: IMeta
}


export const sendResponse = <T>(res: Response, data: IData<T>) => {
    res.status(data.statusCode).json({ success: data.success, message: data.message, data: data.data, meta: data.meta });
}