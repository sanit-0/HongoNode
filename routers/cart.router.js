import express from 'express'
import { addToCart, getCartData, payment, removeCartItem, updateQuantity } from '../controllers/cart.controller'
import auth from '../middelwares/auth.middelware'
const router = express.Router()

router.post('/addToCart',addToCart)

// router.get('/getCartData',auth,getCartData)
router.get('/getCartData/:userid',getCartData)      // without ayth

router.put('/updateQuantity/:cartid',updateQuantity)

router.delete('/removeCartItem/:cartid',removeCartItem)

router.post ('/payment',payment)

export default router;