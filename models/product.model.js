import mongoose from "mongoose";
import categoryModel from "../models/category.model";
import subCategoryModel from "./subCategory.model";

const Schema = mongoose.Schema

const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        default:null
    },
    sku:{
        type:Number,
        default:null
    },
    quantity:{
        type:Number,
        default:1
    },
    description:{
        type:String,
        default:null
    },
    psize:{
        type:String,
        default:null
    },
    thumbnail1:{
        type:String,
        default:null
    },
    thumbnail2:{
        type:String,
        default:null
    },
    images:{
        type:Array,
        default:[]
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:categoryModel
    },
    subCategoryId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:subCategoryModel
    },
    total:{
        type:Number,
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

export default mongoose.model('product',productSchema)