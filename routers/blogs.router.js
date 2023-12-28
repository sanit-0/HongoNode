import express from 'express'

import auth from '../middelwares/auth.middelware'
import { addblog, deleteblog, getblog, getblogs, removeblog, updateblog } from '../controllers/blogs.controller'
const router = express.Router()

router.post('/addblog',addblog)

router.get('/getblogs',getblogs)    

router.get('/getblog/:blog_id',getblog)

router.put('/updateblog/:blog_id',updateblog)

router.delete('/deleteblog/:blog_id',deleteblog)

router.delete('/removeblog/:blog_id',removeblog)




export default router;