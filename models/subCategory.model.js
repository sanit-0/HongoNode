import mongoose from 'mongoose'
import categoryModel from './category.model'

const Schema = mongoose.Schema

const subcategorySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        default:null,
        ref:categoryModel
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:Number,
        default:1
    },
})

export default mongoose.model('subcategory',subcategorySchema)