import express from 'express'
import auth from '../middelwares/auth.middelware'
import { addTowishlist, getwishlist, removeWishlistitem } from '../controllers/Wishlist.controller'
const router = express.Router()

router.post('/addTowishlist',addTowishlist)

router.get('/getwishlist/:userid',getwishlist)   

router.delete('/removeWishlistitem/:wishlistID',removeWishlistitem)


export default router;