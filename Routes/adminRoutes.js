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
router.get('/admin/hosts/verify/:id',requireLogin,adminController.showVerifyHosts);
router.get('/admin/hosts/:id/verify/confirm',requireLogin,adminController.showConfirmVerifyHost);

router.get('/admin/hosts/edit/:id',requireLogin,adminController.showEditHost);
router.get('/admin/users/edit/:id',requireLogin,adminController.showEditUser);
router.get('/admin/users/view/:id',requireLogin,adminController.showViewUser);
router.get('/admin/properties/view/:id',requireLogin,adminController.showViewProperty);
router.get('/admin/users/block/:id', requireLogin, adminController.deleteUser);

router.get('/admin/hosts/:id/delete',requireLogin,adminController.cancelHostVerification);


router.post('/admin/hosts/:id/verify',requireLogin,adminController.verifyHost);
router.post('/admin/hosts/:id/edit',requireLogin,adminController.editHost);
router.post('/admin/users/:id/edit',requireLogin,adminController.editUser);

module.exports=router;
