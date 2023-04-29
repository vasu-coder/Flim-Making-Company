const multer = require("multer");
const path = require("path");

const storage =multer.diskStorage({
    destination:"./public/images/eventphoto",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname +"_"+Date.now()+path.extname(file.originalname));
    }
})
const Upload =multer({
    storage:storage
}).single('file');

module.exports = Upload;