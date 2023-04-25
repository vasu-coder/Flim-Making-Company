const { error } = require("jquery")
const mongoose = require("mongoose")


const loginSchema=mongoose.Schema({

   
    email:{
        type:String,
        required:true,
    
    },
    password:{
        type:String,
        required:true,
        minLenght:3
    }
   

})

const Login =mongoose.model("Login",loginSchema);
module.exports = Login;