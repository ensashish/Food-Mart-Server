import mongoose, { InferSchemaType, Schema } from "mongoose";

const userSchema = new Schema({
    firstName:{
        type:String
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contactNo:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:['MALE', 'FEMALE', 'OTHER']
    },
    password:{
        type:String,
        required:true,
        // select:false
    },
    address:{
        type:String
    },
    isBlocked: {
        type: Boolean,
        default : false
    },
    role:{
        type:String,
        enum:['USER'],
        default:'USER'
    }
},
{
    timestamps:true
});
type User = InferSchemaType<typeof userSchema>;
const User = mongoose.model('user', userSchema);
export default User;