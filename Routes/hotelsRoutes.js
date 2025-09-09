const express=require('express')
const router=express.Router()
const hotelsController=require('../Controllers/hotelsController');
const { requireLogin } = require('../middlewares/authMiddleware');
  
router.get('/',requireLogin,hotelsController.getAllHotels);

router.get('/:id',requireLogin,hotelsController.getHotelById);

router.get('/:id/booking/:roomId', requireLogin, hotelsController.getBookRoom);

router.get('/receipt/:bookingId', requireLogin, hotelsController.getReceipt);

router.post('/:hotelId/booking/:roomId/confirm',requireLogin,hotelsController.bookRoom)
module.exports=router;