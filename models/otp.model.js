import mongoose from "mongoose";

const Schema = mongoose.Schema

const otpSchema = new Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default:null
    }
})

export default mongoose.model('otp',otpSchema)