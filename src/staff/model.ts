import mongoose, { InferSchemaType, Schema } from "mongoose";

const staffSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNo:{
        type:Number,
    },
    password:{
        type:String,
        required:true,
        // select:false
    },
    isActive:{
        type:String,
        enum:['ACTIVE','INACTIVE']
    },
    role:{
        type:String,
        enum:['SUPERADMIN','ADMIN'],
        default:'ADMIN'
    }
},{
    timestamps:true
});
type Staff = InferSchemaType<typeof staffSchema>;
const Staff = mongoose.model('staff', staffSchema);
export default Staff;