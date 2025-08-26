const express=require('express')
const router=express.Router()
const hotelsController=require('../Controllers/hotelsController');


router.get('/',hotelsController.getAllHotels);

router.get('/:id',hotelsController.getHotelById);


module.exports=router;