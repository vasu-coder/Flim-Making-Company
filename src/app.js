const express = require("express");
const path = require("path")
const hbs = require("hbs")
const flash = require('connect-flash');
const session = require('express-session');


require("./db/conn")
const User= require("./models/contact");
const Login = require("./models/login");
const { rmSync } = require("fs");
const app =express();
const port =process.env.PORT || 3000;


const staticpath = path.join(__dirname,"../public");
const viewpath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");
// including bootstrap files
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/*.js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

  
app.use(flash());
app.set("view engine","hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);


// routing
app.get("/",(req,res)=>{
    res.render("index");

})

app.get("/contact",(req,res)=>{
    res.render("contact",{success:''});

})
app.get("/admin",(req,res)=>{
    res.render("admin");

})
app.get("/admincontact",(req,res)=>{
    User.find({}).sort({date:-1})
    .then((records)=>{
        res.render("admincontact",{records});
    })
    .catch((err)=>{
        console.log(err)
    })
   

})
app.post("/contact", async(req,res)=>{
    try{
        const userdata =new User(req.body);
       
         await userdata.save();
        
        res.status(201).render('contact',{success:'We contact you soon'});
        
    
  
      }
    catch(error){
        res.status(500).send(error)
    }

})

app.post("/admin",async(req,res)=>{

    try{
        const email= req.body.email;
        const password = req.body.password;
        const usermail=await Login.findOne({email:email});
        if(usermail.password===password){
            res.status(201).render('admincontact')
        }
        else{
            res.render('admin',{success:'Worng Email or Password'});
        }
    }
    catch(error){
        res.status(500).send("invalid Email")
    }
})

app.get("/about",(req,res)=>{
    res.render("about");

})
// app.post("/admin", async(req,res)=>{
//     try{
//         const data =new Login(req.body);
//         console.log(data);
       
//          await data.save();
        
//         res.status(201).send("done");
        
    
  
//       }
//     catch(error){
//         res.status(500).send(error)
//     }

// })

app.listen(port,()=>{console.log(`Server is running on ${port}`)
});