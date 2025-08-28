const express=require('express')
const router=express.Router()
const hotelsController=require('../Controllers/hotelsController');
const { requireLogin } = require('../middlewares/authMiddleware');
  
router.get('/',requireLogin,hotelsController.getAllHotels);

router.get('/:id',requireLogin,hotelsController.getHotelById);


module.exports=router;