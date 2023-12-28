import contactFormModel from "../models/contactForm.model"

export const sendForm = async(req,res)=>{
    try{
        const userid = req.params.userid
        const {name,email,subject,message} = req.body

        console.log('userid-',userid)
        
        const existform =await contactFormModel.findOne({userid:userid})        
        
        console.log('existform-',existform)

        if(!existform){
            const contactForm = new contactFormModel({
                name:name,
                email:email,
                subject:subject,
                message:message,
                userid:userid
            })
            contactForm.save()

            if(contactForm){
                return res.status(200).json({
                    data:contactForm,
                    message:'Form submited'
                })
            }

           
        }
        else{
            const contactForm =await contactFormModel.updateOne({_id:existform._id},{$set:{
                name:name,
                email:email,
                subject:subject,
                message:message,
                userid:userid
            }})

            if(contactForm.acknowledged){
                return res.status(200).json({
                    message:'Form submited'
                })
            }

        }
        

        
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

export const getForms = async(req,res)=>{
    try{

        const forms = await contactFormModel.find({status:1})

        if(forms){
            return res.status(200).json({
                data:forms,
                total:forms.length,
                message:'Successfull get all forms'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

export const getForm = async(req,res)=>{
    try{

        const formid = req.params.formId

        const forms = await contactFormModel.findOne({_id:formid})

        if(forms){
            return res.status(200).json({
                data:forms,
                message:'Successfull get form'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}

export const removeForm = async(req,res)=>{
    try{

        const forms = await contactFormModel.deleteOne({status:1})

        if(forms){
            return res.status(200).json({
                message:'Successfull deleted'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
}