import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { createError } from "../config/error";
import dotenv from 'dotenv';
dotenv.config();

export const verifyToken = async(req:any, res:Response, next:NextFunction)=>{
    const token = req.header('x-access-token');
    if(!token){
        return next(createError(401,"You are not Authenticated User"));
    }
    JWT.verify(token, (process.env.JWT_SECRETKEY) as string, (err:any, user:any)=>{
        if(err){
            return next(createError(401,"Token is not valid"));
        }
        req.user = user;
        next();
    });
};

export const verifyUser = async(req:any, res:Response, next:NextFunction)=>{
    const {userId} = req.body;
    if(req.user.id===userId && req.user.role==='USER'){
        next();
    }
    else return next(createError(401,"You are not Authorised User"));
};

export const verifyAdmin = async(req:any, res:Response, next:NextFunction)=>{
    const {userId} = req.body;
    if((req.user.role==='SUPERADMIN' || req.user.role==='ADMIN')){
        next();
    }
    else return next(createError(401,"You are not Authorised User"));
};