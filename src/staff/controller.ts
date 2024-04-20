import { NextFunction, Request, Response } from "express";
import { createError } from "../../config/error";
import bcrypt from "bcryptjs";
import Staff from "./model";

export const addStaff = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body.name || req.body.name===""){
            return next(createError(403, "Please give the first name"));
        }
        else if(!req.body.email || req.body.email===""){
            return next(createError(403, "Please give the email"));
        }
        else if(!req.body.contactNo || req.body.contactNo==="" || req.body.contactNo.length<10 || req.body.contactNo.length>10){
            return next(createError(403, "Please give the valid contactNo"));
        }
        else if(!req.body.password || req.body.password===""){
            return next(createError(403, "Please give the valid password"));
        }
        else if(!req.body.isActive || req.body.isActive==="" || (req.body.isActive!=='ACTIVE' && req.body.isActive!=='INACTIVE')){
            return next(createError(403, "Please give the valid isActive status"));
        }
        const salt :string = bcrypt.genSaltSync(10);
        const hash :string  = bcrypt.hashSync(req.body.password, salt);
        const staffObj = {
            name:req.body.name,
            email:req.body.email,
            contactNo:req.body.contactNo,
            password:hash,
            isActive:req.body.isActive
        };
        const getStaff = await Staff.findOne({
            email:staffObj.email
        });
        if(getStaff){
            return next(createError(403, `User already exists with this email : ${staffObj.email}`));
        }
        const newStaff = await Staff.create(staffObj);
        return res.status(201).json({
            error:true,
            message:"Staff Added Successfully...!",
            data:newStaff
        });
    } catch (error) {
        console.log("Staff add Error ::>>",error);
        next(error);
    }
};

export const getAllStaff = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const allStaff = await Staff.find();
        return res.status(201).json({
            error:true,
            message:"Get All Staff Successfully...!",
            totalStaff:allStaff.length,
            data:allStaff
        });
    } catch (error) {
        console.log("Get All Staff Error ::>>",error);
        next(error);
    }
};