const express=require('express');
const router=express.Router();
const hostController=require('../Controllers/hostController');
const requireLogin=require('../middlewares/authMiddleware').requireLogin;

router.get('/register-host',requireLogin,hostController.showHostRegister);



module.exports=router;