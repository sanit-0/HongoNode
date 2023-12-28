import express from 'express'
import { addSubcategory, deletSubcategory, getSubcategories, getSubcategory, removeSubCategory, updateSubcategory } from '../controllers/subCategory.controller'

const router = express.Router()

router.post('/addSubcategory',addSubcategory)

router.get('/getSubcategories',getSubcategories)

router.get('/getSubcategory/:subcategory_Id',getSubcategory)

router.put('/updateSubcategory/:subcategory_Id',updateSubcategory)

router.delete('/deletSubcategory/:subcategory_Id',deletSubcategory)

router.delete('/removeSubCategory/:subcategory_Id',removeSubCategory)



export default router