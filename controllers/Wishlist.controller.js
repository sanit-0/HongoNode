import WishlistModel from "../models/Wishlist.model"
import productModel from "../models/product.model"


export const addTowishlist =async (req,res)=>{
    try {
        // const {productID} = req.body             
        // const userdata = req.cookies.userdata

        const {productID,userID} = req.body             // without auth


        const wishlistItems  = await WishlistModel.findOne({
            productID:productID,
            // userID:userdata._id
            userID:userID
        })

        // const product = await productModel.findOne({_id:productID})



        if(wishlistItems){
            return res.status(200).json({
                message: "Already added",
                
            })
            
        }
        else{
            const product = await productModel.findOne({_id:productID})

            // console.log(product)
            const saveWishlist = new WishlistModel({
                // userID:userdata._id,
                userID:userID,
                productID:productID,
                title:product.title,
                thumbnail:product.thumbnail1,
                price:product.price,
                
            })

            saveWishlist.save()

            if(saveWishlist){
                return res.status(200).json({
                    message:"Successfully added to Wishlist"
                })
            }
        }

        


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getwishlist = async(req,res) =>{
    try{
        // const userdata = req.cookies.userdata
        const userdata = req.params.userid

        // console.log('userdata-',userdata)

        // const wishlist = await WishlistModel.find({userID:userdata._id})
        const wishlist = await WishlistModel.find({userID:userdata})

        if(wishlist){
            return res.status(200).json({
                data:wishlist,
                total:wishlist.length,
                filepath:`http://localhost:${process.env.PORT}/uploads`,
                message: "Successfully fetch",
                
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}


export const removeWishlistitem = async (req,res) =>{
    try{
        const WishlistId = req.params.wishlistID
        const {userid} = req.body
        const Wishlistdata = await WishlistModel.findOne({productID:WishlistId,userID:userid})

        const deleteItem = await WishlistModel.deleteOne({_id:Wishlistdata._id})

        if(deleteItem.acknowledged){
            return res.status(200).json({
                message:'successfully delete'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}





