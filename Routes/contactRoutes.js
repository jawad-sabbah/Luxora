const express=require('express')
const router=express.Router()
const contactController=require('../Controllers/contactController')

router.get('/contact',contactController.showContact)

module.exports=router