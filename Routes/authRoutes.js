const express=require('express')
const router=express.Router()
const authController=require('../Controllers/authController')

 router.get('/login',authController.showLogin);
 router.get('/register',authController.showRegister);

 module.exports=router