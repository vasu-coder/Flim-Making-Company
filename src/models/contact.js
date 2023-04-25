const { error } = require("jquery")
const mongoose = require("mongoose")
const validator =require("validator")

const userSchema=mongoose.Schema({

    name:{
        type:String,
        required:true,
        minLenght:3
    },
    email:{
        type:String,
        required:true,
       validator(value){
        if (!validator.isEmail(value)){
            throw new error("Invalid Email")
        }
       }
    },
    phone:{
        type:Number,
        required:true,
        minLenght:3
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const User =mongoose.model("User",userSchema);
module.exports = User;