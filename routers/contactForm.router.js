import express from 'express'
import { getForm, getForms, removeForm, sendForm } from '../controllers/contactForm.controller'

const router = express.Router()

router.post('/addform/:userid',sendForm)
router.get('/getforms',getForms)
router.get('/getform/:formId',getForm)
router.delete('/removeform/:formId',removeForm)

export default router