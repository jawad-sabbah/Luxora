const express=require('express')
const router=express.Router()
const aboutController=require('../Controllers/aboutController')

router.get('/about',aboutController.showAboutPage)

module.exports=router