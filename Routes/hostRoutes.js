const express=require('express');
const router=express.Router();
const hostController=require('../Controllers/hostController');

router.get('/register-host',hostController.showHostRegister);

router.get('/terms',hostController.showTermsAndConditions);


module.exports=router;