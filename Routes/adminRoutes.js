const express=require('express');
const router=express.Router();  
const adminController=require('../Controllers/adminController');
const {requireLogin}=require('../middlewares/authMiddleware');
const { route } = require('./authRoutes');

router.get('/admin/dashboard',requireLogin,adminController.showDashboard);
router.get('/admin/users',requireLogin,adminController.showUsers);
router.get('/admin/hosts',requireLogin,adminController.showHosts);
router.get('/admin/properties',requireLogin,adminController.showProperties);
router.get('/admin/bookings',requireLogin,adminController.showBookings);

module.exports=router;
