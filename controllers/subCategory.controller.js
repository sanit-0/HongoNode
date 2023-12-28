import subCategoryModel from "../models/subCategory.model"


export const addSubcategory = async (req,res)=>{
    try{


            const{title,categoryId} = req.body

            

            const saveSubcategory =new subCategoryModel({
                title:title,
                categoryId:categoryId
            })

            saveSubcategory.save()

            if(saveSubcategory){
                return res.status(201).json({
                    data:saveSubcategory,
                    message:'successfully inserted'
                })
            }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getSubcategories = async(req,res)=>{
    try{

        const {search} = req.query

        const rgx = (pattern)=>new RegExp(`.*${pattern}.*`)

        const searchRgx = rgx(search)

        let filter = {status:1}

        if(search){
            filter= {
                ...filter,
                $or:[
                    {title:{$regex:searchRgx,$options:'i'}},
                ]
            }

        }

        const getsubcategory = await subCategoryModel.find(filter)

        if(getsubcategory){
            return res.status(200).json({
                data:getsubcategory,
                total:getsubcategory.length,
                message:'successfully fetch all Subcategories'
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}

export const getSubcategory = async(req,res)=>{
    try{
        const subcategoryId = req.params.subcategory_Id

        const getsubcategory= await subCategoryModel.findOne({_id:subcategoryId})

        if(getsubcategory){
            return res.status(200).json({
                data:getsubcategory,
                message:'successfully get single category',
    
            })
        }
    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}

export const updateSubcategory = async(req,res)=>{
    try{


            const subcategoryId = req.params.subcategory_Id

            const subcatdata = await subCategoryModel.findOne({_id:subcategoryId})


            const {title,categoryId} = req.body


            const updatedsubcategory = await subCategoryModel.updateOne({_id:subcategoryId},{$set:{
                title:title,
                categoryId:categoryId,

            }})

            if(updatedsubcategory.acknowledged){
                return res.status(200).json({
                    message:'category updated'
                })
            }
         

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}

export const deletSubcategory = async(req,res)=>{
    try{

            const subcategoryId = req.params.subcategory_Id

            
            const deletesubcategory = await subCategoryModel.updateOne({_id:subcategoryId},{$set:{
               
                status:0
            }})

            if(deletesubcategory.acknowledged){
                return res.status(200).json({
                    message:'category deleted'
                })
            }
        

    }
    catch(error){
        return res.status(500).json({
            message:error.message
        })
    }

}

export const removeSubCategory =async (req,res) =>{

    try {
        
        const subcategoryId = req.params.subcategory_Id

        
        const removeSubCategory =await subCategoryModel.deleteOne({_id:subcategoryId})

        if(removeSubCategory.acknowledged){
            return res.status(200).json({
                message:'successfully deleted'

            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

    

}



