const { error } = require("jquery")
const mongoose = require("mongoose")

const photoSchema=mongoose.Schema({

    imagename:{
        type:String,
        
    },
    
    date:{
        type:Date,
        default:Date.now
    }

})
 const Photo = mongoose.model("Photo",photoSchema);

module.exports = Photo;