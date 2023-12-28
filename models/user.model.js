import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        default:null
    },
    lname:{
        type:String,
        default:null
    },
    companyname:{
        type:String,
        default:null
    },
    countryname:{
        type:String,
        default:null
    },
    street:{
        type:String,
        default:null
    },
    town:{
        type:String,
        default:null
    },
    state:{
        type:String,
        default:null
    },
    zipcode:{
        type:String,
        default:null
    },
    contact:{
        type:Number,
        default:null
    },
    bemail:{
        type:String,
        required:null
    },
    thumbnail:{
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
});

export default mongoose.model('user',UserSchema)