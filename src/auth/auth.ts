import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import User from "../user/model";
import { createError } from "../../config/error";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import Staff from "../staff/model";
dotenv.config();

export const register = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body.firstName || req.body.firstName===""){
            return next(createError(403, "Please give the first name"));
        }
        else if(!req.body.lastName || req.body.lastName===""){
            return next(createError(403, "Please give the last name"));
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
        const salt :string = bcrypt.genSaltSync(10);
        const hash :string  = bcrypt.hashSync(req.body.password, salt);
        const userObj = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            contactNo:req.body.contactNo,
            gender:req.body.gender,
            password:hash,
            address:req.body.address
        };
        const getUser = await User.findOne({
            email:userObj.email
        });
        if(getUser){
            return next(createError(403, `User already exists with this email : ${userObj.email}`));
        }
        const newUser = await User.create(userObj);
        return res.status(201).json({
            error:false,
            message:"User Registered Successfully...!",
            data:newUser
        });
    } catch (error) {
        console.log("Register User ::>>",error);
        next(error);
    }
};

export const login = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body.username || req.body.username===""){
            return next(createError(403, "Please give the valid email"));
        }
        else if(!req.body.password || req.body.password===""){
            return next(createError(403, "Please give the valid password"));
        }
        let getUser; 
        if(/^\d+$/.test(req.body.username) && req.body.username.length===10){
            getUser = await User.findOne({
                contactNo:req.body.username
            });
        }
        else{
            getUser = await User.findOne({
                email:req.body.username
            });
        }
        if(!getUser){
            return next(createError(403, `User doesn't exists with this username : ${req.body.username}`));
        }
        
        const isPasswordMatched: boolean = bcrypt.compareSync(req.body.password as string, getUser.password as string);
        if(!isPasswordMatched){
            return next(createError(403, "Invalid Credentials"));
        }
        const {password, ...rest} = getUser;
        const token = JWT.sign({
                                    id:getUser._id,
                                    firstName:getUser.firstName,
                                    lastName:getUser.lastName,
                                    email:getUser.email,
                                    contactNo:getUser.contactNo,
                                    gender:getUser.gender,
                                    address:getUser.address,
                                    role:getUser.role
                                }, (process.env.JWT_SECRETKEY) as string, {expiresIn:'2h'});
        return res.status(200).json({
            error:false,
            message:"User Login Successfully...!",
            token: token
        });
    } catch (error) {
        console.log("Login User ::>>",error);
        next(error);
    }
};

export const adminLogin = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        if(!req.body.username || req.body.username===""){
            return next(createError(403, "Please give the valid email"));
        }
        else if(!req.body.password || req.body.password===""){
            return next(createError(403, "Please give the valid password"));
        }
        let getStaff; 
        if(/^\d+$/.test(req.body.username) && req.body.username.length===10){
            getStaff = await Staff.findOne({
                contactNo:req.body.username
            });
        }
        else{
            getStaff = await Staff.findOne({
                email:req.body.username
            });
        }
        if(!getStaff){
            return next(createError(403, `User doesn't exists with this username : ${req.body.username}`));
        }
        
        const isPasswordMatched: boolean = bcrypt.compareSync(req.body.password, getStaff.password);
        if(!isPasswordMatched){
            return next(createError(403, "Invalid Credentials"));
        }
        const {password, ...rest} = getStaff;
        const token = JWT.sign({
            id:getStaff._id,
            email:getStaff.email,
            role:getStaff.role
        }, (process.env.JWT_SECRETKEY) as string, {expiresIn:'2h'});
        return res.status(201).json({
            error:false,
            message:"Staff Login Successfully...!",
            token: token
        });
    } catch (error) {
        console.log("Admin-Login Error ::>>",error);
        next(error);
    }
};