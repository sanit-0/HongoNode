import cartModel from "../models/cart.model"
import productModel from "../models/product.model"
import Stripe from 'stripe'

const stripe = Stripe('sk_test_51O9MjlSEfDVbUeGiQUop2cD2J3q2EHRfwMxI22gkzXoY4MnkD6ar6tsE8Rmtl3z0gDqs2kDC5Q79gJqpTkdnyXah00UPGe3eIh')

export const addToCart =async (req,res)=>{
    try {
        // const {productID} = req.body             
        // const userdata = req.cookies.userdata

        const {productID,userID} = req.body             // without auth


        const cartItems  = await cartModel.findOne({
            productID:productID,
            // userID:userdata._id
            userID:userID
        })

        // const product = await productModel.findOne({_id:productID})



        if(cartItems){
            const quantity = cartItems.quantity+1
            // const quantity = product.quantity+1

            const total = cartItems.price*quantity

            console.log('total-',total)


            if(quantity>10){
                return res.status(200).json({
                      message: "Can not add more than 10 items",
                })
            }

            const updateCart = await cartModel.updateOne({_id:cartItems._id},{
                $set: {
                    quantity: quantity,
                    total: total,
                  },
            
            })

            if(updateCart.acknowledged){
                return res.status(200).json({
                    message: "Cart updated",
                    
                })
            }
        }
        else{
            const product = await productModel.findOne({_id:productID})

            // console.log(product)
            const saveCart = new cartModel({
                // userID:userdata._id,
                userID:userID,
                productID:productID,
                title:product.title,
                thumbnail:product.thumbnail1,
                price:product.price,
                quantity:product.quantity,
                total:product.total
            })

            saveCart.save()

            if(saveCart){
                return res.status(200).json({
                    message:"Successfully added to cart"
                })
            }
        }

        


    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const getCartData = async(req,res) =>{
    try{
        // const userdata = req.cookies.userdata
        const userdata = req.params.userid

        console.log('userdata-',userdata)

        // const cartItems = await cartModel.find({userID:userdata._id})
        const cartItems = await cartModel.find({userID:userdata})

        if(cartItems){
            return res.status(200).json({
                data:cartItems,
                total:cartItems.length,
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

export const updateQuantity = async (req,res) =>{
    try{
        const cartid = req.params.cartid

        const {type} = req.query;

        const cartItem = await cartModel.findOne({_id:cartid})

        let quantity = cartItem.quantity
        let price = cartItem.price
        

        if(type == "inc"){
            quantity += 1
            
        }
        if(type == "desc"){
            quantity -= 1

        }

        if(quantity>10){
            return res.status(200).json({
                message: "Can not add more than 10 items",
            })
        }
        if(quantity < 1){   
            // const deleteItem = await cartModel.deleteOne({_id:cartid})
            return res.status(200).json({
                message: "Quantity should not be less than 1",
            })
        }

        const updatedTotal = price * quantity;

        const update = await cartModel.updateOne({_id:cartid},{$set:{
            quantity:quantity,
            total:updatedTotal
        }})

        if(update.acknowledged){
            return res.status(200).json({
                message:'updated'
            })
        }
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}

export const removeCartItem = async (req,res) =>{
    try{
        const cartid = req.params.cartid

        const deleteItem = await cartModel.deleteOne({_id:cartid})

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

export const payment = async (req,res) =>{
    try{
       const {data}= req.body

       const lineItems = data.map((elm)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:elm.title
                },
                unit_amount:elm.price * 100
            },
            quantity:elm.quantity
       }))

       const session =await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:'http://localhost:3000/',
            cancel_url:'http://localhost:3000/cart',

       })

    
        return res.status(200).json({
            id:session.id
        })
        
    }
    catch (error) {
        return res.status(500).json({
            message:error.message
        })
    }
}



