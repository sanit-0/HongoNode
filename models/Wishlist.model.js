import mongoose from "mongoose";
import productModel from "./product.model";
import userModel from "./user.model";

const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    productID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:productModel
    },
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:userModel
    },
    title:{
        type:String,
        required:true
    },
    thumbnail:{
        type:String,
        required:null,
    },
    price:{
        type:String,
        required:null
    },
    
})

export default mongoose.model('wishlist',wishlistSchema)