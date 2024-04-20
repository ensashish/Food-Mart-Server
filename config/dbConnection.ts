import { error } from 'console';
import mongoose from 'mongoose';

const dbConnect = ()=>{
    const MONGODB_URI: string = (process.env.MONGODB_URI as string);
    mongoose.connect(MONGODB_URI).then(()=>{
        console.log("|--- Database connected successfully ---|");
    })
    .catch((error:Error)=>{
        console.log("Database error--->", error);
    });
}

export default dbConnect;