import multer from 'multer'
import {storage} from '../util/fileUploads'
import fs from 'fs'
import mongoose, { Schema } from 'mongoose'
import productModel from '../models/product.model'


const upload = multer({storage:storage})

export const addproduct = async (req,res)=>{
    try{

        const uploadproductdata = upload.fields([
            {name:'thumbnail1',maxCount:1},
            {name:'thumbnail2',maxCount:1},
            {name:'images',maxCount:10}
        ])

        uploadproductdata(req,res, async function(err){
            if(err){
                return res.status(400).json({
                    message:err.message

                })
            }

            
            let thumbnailImage1 = null
            let thumbnailImage2 = null
            let imageArr = []

        
            if(req.files['thumbnail1']){
                thumbnailImage1 =  req.files['thumbnail1'][0].filename
            }
            if(req.files['thumbnail2']){
                thumbnailImage2 =  req.files['thumbnail2'][0].filename
            }
            if(req.files['images']){
                req.files['images'].forEach((image)=>{
                    imageArr.push(image.filename)
                })
            }

            const {title,price,sku,quantity,description,psize,categoryId,subCategoryId} = req.body
   
            const total = price*quantity
            
            const product = new productModel({
                title:title,
                price:price,
                sku:sku,
                quantity:quantity,
                description:description,
                psize:psize,
                thumbnail1:thumbnailImage1,
                thumbnail2:thumbnailImage2,
                images:imageArr,
                categoryId:categoryId,
                subCategoryId:subCategoryId,
                total:total
            })

            product.save()
            if(product){
                return res.status(201).json({
                    data:product,
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

export const getproducts = async(req,res)=>{
    try{

        const {search,searchid,page,size,minPrice,maxPrice,psize} = req.query

        const skipno = (page-1)*size

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search);

        let filter = {status:1}


        
        
        if (searchid) {
            const objectId  = new mongoose.Types.ObjectId(searchid);
            filter = {
                ...filter,
                $or: [
                    { categoryId: objectId },
                    { subCategoryId: objectId }
                  ]
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
        }
        if(psize){
            

            filter={
                ...filter,
                psize:psize
            }
        }

        
        if (minPrice && maxPrice) {
            filter.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
          }
           else if (minPrice) {
            filter.price = { $gte: parseFloat(minPrice) };
          } 
          else if (maxPrice) {
            filter.price = { $lte: parseFloat(maxPrice) };
          }

        const productdata = await productModel.find(filter).populate([
            {path:'categoryId'},
            {path:'subCategoryId'},
        ])
          .limit(size)
          .skip(skipno);


        if(productdata){
            return res.status(200).json({
                data:productdata,
                total:productdata.length,
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

export const getproduct =async (req,res) =>{

    try {
        
        const productID = req.params.product_id
  
        const getproduct =await productModel.findOne({_id:productID}).populate([
            {path:'categoryId'},
            {path:'subCategoryId'},
        ])
  
    if(getproduct){
        return res.status(200).json({
            data:getproduct,
            message:'successfully get single product',
            filepath:`http://localhost:${process.env.PORT}/uploads`,

  
        })
    }
        
    } catch (error) {
  
        return res.status(500).json({
            message:error.message
        })
        
    }
  
    
  
  }

export const updateproducts = async (req, res) => {
    try {
      const uploadproductsData = upload.fields([
        {name:'thumbnail1',maxCount:1},
        {name:'thumbnail2',maxCount:1},
        {name:'images',maxCount:10}
    ])
  
      uploadproductsData(req, res, async function (err) {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }

        const productId = req.params.product_id
  
        const existproducts = await productModel.findOne({_id:productId});
  
        console.log(existproducts)
        let thumbnailImage1 = existproducts.thumbnail1;   //single img
        let thumbnailImage2 = existproducts.thumbnail2;   //single img
        let imageArr = existproducts.images || [];            // multi img

        
        
        if(req.files['thumbnail1']){                   // to update single image
            thumbnailImage1= req.files['thumbnail1'][0].filename
  
            if(fs.existsSync('uploads/'+existproducts.thumbnail1)){
              fs.unlinkSync('uploads/'+existproducts.thumbnail1)
            }
        }
        if(req.files['thumbnail2']){                   // to update single image
            thumbnailImage2= req.files['thumbnail2'][0].filename
  
            if(fs.existsSync('uploads/'+existproducts.thumbnail2)){
              fs.unlinkSync('uploads/'+existproducts.thumbnail2)
            }
        }

        if(req.files['images']){        // to update multiply images
          imageArr=[]
          req.files['images'].forEach((image)=>{

              imageArr.push(image.filename);

              // console.log(imageArr)
          })
          
        }

        const {title,price,sku,quantity,description,psize,categoryId,subCategoryId} = req.body


        let totalprice = existproducts.price
        if(price){
            totalprice=price
        }
        if(quantity){
            totalprice = existproducts.price *quantity
        }
  
        const updatePro = await productModel.updateOne({_id:productId},{$set:{
            title:title,
            price:price,
            sku:sku,
            quantity:quantity,
            description:description,
            psize:psize,
            thumbnail1:thumbnailImage1,
            thumbnail2:thumbnailImage2,
            images:imageArr,
            categoryId:categoryId,
            subCategoryId:subCategoryId,
            total:totalprice
        }})
  
        if (updatePro.matchedCount) {
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

export const deletproduct = async(req,res)=>{
    try{

            const productId = req.params.product_ID
            
            const deleteproduct = await productModel.updateOne({_id:productId},{$set:{
               
                status:0
            }})

            if(deleteproduct.acknowledged){
                return res.status(200).json({
                    message:'product deleted'
                })
            }
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}


export const removeproduct =async (req,res)=>{
    try{
        const productID = req.params.product_ID

        const productdata =await productModel.findOne({_id:productID})


        if(productdata.images){
        const imgArr = productdata.images

          imgArr.forEach((img)=>{
            // console.log(img)
  
             if(fs.existsSync('uploads/'+img)){
                fs.unlinkSync('uploads/'+img)
            }
          })
        }



        if(fs.existsSync('uploads/'+productdata.thumbnail1)){
            fs.unlinkSync('uploads/'+productdata.thumbnail1)
        }
        if(fs.existsSync('uploads/'+productdata.thumbnail2)){
            fs.unlinkSync('uploads/'+productdata.thumbnail2)
        }

        const removeproduct =await productModel.deleteOne({_id:productID})

        if(removeproduct.acknowledged){
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


