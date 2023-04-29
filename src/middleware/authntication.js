const jwt = require("jsonwebtoken");

const Login =require("../models/login");

const authi= async (req,res,next)=>{
        try{
                const token = req.cookies.jwt;
                const verifyuser = jwt.verify(token, process.env.SECERT_KEY);
                console.log(verifyuser);
                next();
        }
        catch(err){
                res.status(401).send(" Please login to admin panel");
        }
}
module.exports = authi;