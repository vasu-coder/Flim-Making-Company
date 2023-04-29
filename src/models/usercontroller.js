const control = require("./adminroute");

const loadadmin = function(req,res){
    try{
            res.render('admin');
    }
    catch(err){
        console.log(err);

    }
}

module.exports ={loadadmin};