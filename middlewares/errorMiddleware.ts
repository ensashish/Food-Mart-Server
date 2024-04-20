import { NextFunction, Response } from "express";

export function errorMiddleWare(error:any, req:Request, res:Response, next:NextFunction){
    const errorStatus:number = error.status || 500;
    const errorMessage:string = error.message || "Something went wrong on Server::";
    return res.status(errorStatus).json({
        error:true,
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack : error.stack
    })
};

