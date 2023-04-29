// const express = require("express");
// const admin_route = express();
// const hbs = require("hbs")
// const path = require("path")
// const viewpath = path.join(__dirname,"../templates/views");
// const session = require("express-session");
// const Login = require("./login");
// admin_route.use(session({secret:Login.session_secret}))

// const bodyparser = require("body-parser");
// admin_route.use(bodyparser.json())
// admin_route.use(bodyparser.urlencoded({extended:true}))
// admin_route.set("view engine","hbs");
// admin_route.set("views", viewpath);




// admin_route.get("/",(req,res)=>{
//     res.render('admin');
// }
// );
// // admin_route.get("*",(req,res)=>{
// //         res.redirect("/admin");
// // })
// module.exports = admin_route;