require('dotenv').config();
const express = require("express");
const path = require("path")
const hbs = require("hbs")
const flash = require('connect-flash');
const session = require('express-session');
const bycrpt = require("bcryptjs");
const jwt  = require("jsonwebtoken");
const cookieparser= require("cookie-parser");
const authi = require("./middleware/authntication");
const multer = require("multer");
const Upload = require("./middleware/uploadphoto");

require("./db/conn")
const User= require("./models/contact");
const Login = require("./models/login");
const Photo = require("./models/eventphoto");

const { rmSync } = require("fs");
const app =express();
const port =process.env.PORT || 3000;
const admin_route = require("./models/adminroute")

const staticpath = path.join(__dirname,"../public");
const viewpath = path.join(__dirname,"../templates/views");
const partialpath = path.join(__dirname,"../templates/partials");
// including bootstrap files
app.use(cookieparser());
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/*.js')));
app.use('/jq', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use(express.urlencoded({extended:false}))
app.use(express.static(staticpath))

  
app.use(flash());
app.set("view engine","hbs");
app.set("views", viewpath);
hbs.registerPartials(partialpath);

const auth = (Permissions)=>{
    return(req,res,next)=>{
        const user= req.body.email
        if(Permissions.includes(user)){
            next()
        }
        else{
            return res.status(401).redirect("/admin")
        }
    }
}


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
// app.get("/admin/*",(req,res)=>{
//     res.redirect("/admin");

// })
app.get("/admincontact",authi,(req,res)=>{
    console.log(`this the auth cookie ${req.cookies.jwt}`);
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

// app.use("/admin",admin_route)
app.post("/admin",async(req,res)=>{

    try{
        const email= req.body.email;
        const password = req.body.password;
        const usermail=await Login.findOne({email:email});
        
        const ismatch =  await bycrpt.compare(password,usermail.password);
        const token= await usermail.generateAuthToken();
        console.log(token);
        res.cookie("jwt",token,{
            expires:new Date(Date.now()+ 600000),
            httpOnly:true
        });

        // console.log(coo);

        if(ismatch){
            res.status(201).redirect('/admincontact')
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
app.get("/membership",(req,res)=>{
    res.render("member");

})
// app.post("/admin", async(req,res)=>{
//     try{
//         const data =new Login(req.body);
//         console.log(data);
//         const token= await data.generateAuthToken();
//         console.log(token);
// res.cookie("jwt",token,{
//     expires:new Date(Date.now()+ 600000),
//     httpOnly:true
// });
//         await data.save();
        
//         res.status(201).send("done");
        
    
  
//       }
//     catch(error){
//         res.status(500).send(error)
//     }

// })



app.post("/adminevent",Upload,function (req,res){
    try{
    const imagedata = Photo.find({}).sort({date:-1});
    const imageFile = req.file.filename;
    const success = req.file.filename + " upload sucessfully"
    console.log(`this the auth cookie ${req.cookies.jwt}`);
    console.log(success);
    const imagedetail = new Photo({
        imagename:imageFile
    });
    imagedetail.save();
    res.render('adminevent',{success});

    
}
catch(err){
    res.status(500).send(error);
}
    
})

app.get("/adminevent",authi,(req,res)=>{
    res.render('adminevent')
})

app.get("/event",(req,res)=>{
   
        Photo.find({}).sort({date:-1})
        .then((records)=>{
            res.render('event',{records});
        })
        .catch((err)=>{
            console.log(err)
        })
        
    
    
    
})


app.listen(port,()=>{console.log(`Server is running on ${port}`)
});