import express from "express";
import {deleteuser, getuser, getusers, login, loginOtp, removeuser, sendotp, signUp, updateUser, verifyOtp } from "../controllers/user.controller";

const router  = express.Router()

router.post('/signup',signUp)

router.post('/login',login)

router.get('/getusers',getusers)

router.get('/getuser/:userID',getuser)

router.put('/updateuser/:userID',updateUser)

router.delete('/deleteuser/:userID',deleteuser)

router.delete('/removeuser/:userID',removeuser)


// Auth routes

router.post('/sendotp',sendotp)
router.post('/verifyOtp',verifyOtp)

export default router