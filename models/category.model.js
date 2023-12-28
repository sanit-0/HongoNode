import mongoose from "mongoose";

const Schema = mongoose.Schema

const categorySchema = new Schema({
    title:{
        type:String,
        required:true
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

export default mongoose.model('category',categorySchema)