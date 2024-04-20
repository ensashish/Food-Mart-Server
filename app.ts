import express, { Application, NextFunction, Request, Response} from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from "cors";
import dbConnect from './config/dbConnection';
import {errorMiddleWare} from './middlewares/errorMiddleware';
import router from "./src/index";
dotenv.config();

const PORT = process.env.PORT;
const app : Application = express();
app.use(express.json());
app.use(bodyParser.json());
dbConnect();
app.use(cors());

app.get('/', (req: Request, res:Response, next:NextFunction)=>{
    res.status(200).json({
        message:"Server is Running"
    });
});

app.use('/api/v1',router);
app.use(errorMiddleWare as any);

app.listen(PORT, ()=>{
    console.log(`|-- Server is Running at Port ${PORT} --|`);
});