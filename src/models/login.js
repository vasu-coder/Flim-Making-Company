const { error } = require("jquery")
const mongoose = require("mongoose")
const bycrpt= require("bcryptjs");
const jwt = require("jsonwebtoken")


const loginSchema=mongoose.Schema({

    
    email:{
        type:String,
        required:true,
    
    },
    password:{
        type:String,
        required:true,
        minLenght:3
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
   

})
loginSchema.methods.generateAuthToken = async function(){
    try{
        const token = jwt.sign({_id:this._id.toString()},process.env.SECERT_KEY);
        this.tokens=this.tokens.concat({token:token});
        await this.save();
        // console.log(token);
        return token;
    }
    catch(err){
            console.log(err);
    }
}
loginSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password= await bycrpt.hash(this.password,10);
    next();
    }
    
})

const Login =mongoose.model("Login",loginSchema);
module.exports = Login;