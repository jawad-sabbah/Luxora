const express=require('express');
const router=express.Router();
const hostController=require('../Controllers/hostController');
const {requireLogin}=require('../middlewares/authMiddleware');

router.get('/register-host',requireLogin,hostController.showHostRegister);



router.post('/registerHost',requireLogin,hostController.RegisterAsHost)



module.exports=router;