const mon = require("mongoose");
// creating a database 
mon.connect("mongodb://localhost:27017/Film").then(()=>{
    console.log("connection Successful")
}).catch((error)=>{
    console.log(error);
})

