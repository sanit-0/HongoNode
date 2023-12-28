import multer from 'multer'
import {storage} from '../util/fileUploads'
import fs from 'fs'
import mongoose, { Schema } from 'mongoose'
import blogsModel from '../models/blogs.model'


const upload = multer({storage:storage})

export const addblog = async (req,res)=>{
    try{

        const uploadBlogsData = upload.single("thumbnail");

        uploadBlogsData(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

            let img = null;

            if(req.file){
                img =req.file.filename
            }

            const {title,description,categoryId,date,author} = req.body
   
            
            const blog = new blogsModel({
                title:title,
                description:description,
                categoryId:categoryId,
                date:date,
                author:author,
                thumbnail:img,
            })

            blog.save()
            if(blog){
                return res.status(201).json({
                    data:blog,
                    message:"successfully created"
                })
            }
        })

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getblogs = async(req,res)=>{
    try{

        const {search,searchid,page,size} = req.query

        const skipno = (page-1)*size

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        
        
        if (searchid) {
            const objectId  = new mongoose.Types.ObjectId(searchid);
            filter = {
                ...filter,
                 categoryId: objectId 
                  
            };
        }
        if(search){
            

            filter={
                ...filter,
                $or:[
                    {title:{$regex:searchRgx , $options:"i"}},
                    {description:{$regex:searchRgx , $options:"i"}},                    
                ]
            }
            console.log(filter)
        }

    

        const blogsdata = await blogsModel.find(filter).populate('categoryId')
          .limit(size)
          .skip(skipno);


        if(blogsdata){
            return res.status(200).json({
                data:blogsdata,
                total:blogsdata.length,
                message:'successfully featch',
                filepath:`http://localhost:${process.env.PORT}/uploads`,

            })
        }

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getblog =async (req,res) =>{

    try {
        
        const blogID = req.params.blog_id
  
        const getblog =await blogsModel.findOne({_id:blogID}).populate('categoryId')
  
    if(getblog){
        return res.status(200).json({
            data:getblog,
            message:'successfully get single blog',
            filepath:`http://localhost:${process.env.PORT}/uploads`,

  
        })
    }
        
    } catch (error) {
  
        return res.status(500).json({
            message:error.message
        })
        
    }
  
    
  
  }

export const updateblog = async (req, res) => {
    try {
    const uploadBlogsData = upload.single("thumbnail");
  
    uploadBlogsData(req, res, async function (err) {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }

        const blogId = req.params.blog_id
  
        const existblogs = await blogsModel.findOne({_id:blogId});
  
        console.log(existblogs)
        let img = existblogs.thumbnail;   //single img  
        
        if(req.file){
            img =req.file.filename
        
  
            if(fs.existsSync('uploads/'+existblogs.thumbnail)){
              fs.unlinkSync('uploads/'+existblogs.thumbnail)
            }
        }
        

        const {title,description,categoryId,date,author} = req.body
   
            
        const updateblog =await blogsModel.updateOne({_id:blogId},{$set:{
            title:title,
                description:description,
                categoryId:categoryId,
                date:date,
                author:author,
                thumbnail:img,
        }})
  
        if (updateblog.matchedCount) {
          return res.status(200).json({
            message: "Updated",
          });
        }
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteblog = async(req,res)=>{
    try{

            const blogId = req.params.blog_id
            
            const deleteblog = await blogsModel.updateOne({_id:blogId},{$set:{
                status:0
            }})

            if(deleteblog.acknowledged){
                return res.status(200).json({
                    message:'blog deleted'
                })
            }
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}


export const removeblog =async (req,res)=>{
    try{
        const blogID = req.params.blog_id

        console.log(blogID)

        const blogdata =await blogsModel.findOne({_id:blogID})

        if(fs.existsSync('uploads/'+blogdata.thumbnail)){
            fs.unlinkSync('uploads/'+blogdata.thumbnail)
        }
       
        const removeblog =await blogsModel.deleteOne({_id:blogID})

        if(removeblog.acknowledged){
            return res.status(200).json({
                message:'deleted'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })    
    }
}


