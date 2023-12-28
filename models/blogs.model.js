import mongoose from "mongoose";
import categoryModel from "../models/category.model";

const Schema = mongoose.Schema

const blogsSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:null
    },
    thumbnail:{
        type:String,
        default:null
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:categoryModel
    },
    date:{
        type:String,
        default:null
    },
    author:{
        type:String,
        default:null
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

export default mongoose.model('blog',blogsSchema)