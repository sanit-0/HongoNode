import multer from "multer";
import fs from 'fs'
import path from 'path'

export const storage = multer.diskStorage({
    destination:function(req,file,cb){
        if(fs.existsSync('uploads/')){
            cb(null,'uploads/')
        }
        else{
            fs.mkdirSync('uploads/')
            cb(null,'uploads/')
        }
    },
    filename:function(req,file,cb){
        const num  = Date.now()
        const orgname = file.originalname
        const ext = path.extname(orgname)
        const imgname = path.basename(orgname,ext)

        cb(null,imgname+'-'+num+ext)
    }
})