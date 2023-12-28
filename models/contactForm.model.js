import mongoose from "mongoose";
import userModel from "./user.model";

const Schema = mongoose.Schema

const contactFormSchema = new Schema({

    name:{
        type:String,
        default:null
    },
    email:{
        type:String,
        default:null
    },
    subject:{
        type:String,
        default:null
    },
    message:{
        type:String,
        default:null
    },
    userid:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:userModel
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default:1
    }

})

export default mongoose.model('contactForm',contactFormSchema)