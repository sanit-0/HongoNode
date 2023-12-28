import  express  from "express";
import { addcategory, getcategories, getcategory, removecategory, updatecategory } from "../controllers/category.controller";

const router = express.Router()

router.post('/addcategory',addcategory)

router.get('/getcategories',getcategories)

router.get('/getcategory/:category_id',getcategory)

router.put('/updatecategory/:category_id',updatecategory)

router.delete('/removecategory/:category_id',removecategory)

export default router