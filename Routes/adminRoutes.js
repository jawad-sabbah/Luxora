const express=require('express');
const router=express.Router();  
const adminController=require('../Controllers/adminController');
const {requireLogin}=require('../middlewares/authMiddleware');


router.get('/admin/dashboard',requireLogin,adminController.showDashboard);
router.get('/admin/users',requireLogin,adminController.showUsers);
router.get('/admin/hosts',requireLogin,adminController.showHosts);
router.get('/admin/properties',requireLogin,adminController.showProperties);
router.get('/admin/bookings',requireLogin,adminController.showBookings);


// View, Edit, Block Users
router.get('/admin/users/view/:id',requireLogin,adminController.showViewUser);
router.get('/admin/users/edit/:id',requireLogin,adminController.showEditUser);
router.get('/admin/users/block/:id', requireLogin, adminController.deleteUser);
router.post('/admin/users/:id/edit',requireLogin,adminController.editUser);


//  Edit, Verify, Block Hosts
router.get('/admin/hosts/edit/:id',requireLogin,adminController.showEditHost);

router.post('/admin/hosts/:id/edit',requireLogin,adminController.editHost);
router.post('/admin/hosts/block/:id',requireLogin,adminController.deleteHost);


//SHOW HOST REQUESTS
router.get('/admin/hostsRequests',requireLogin,adminController.showHostRequests);
module.exports=router;
router.post('/admin/hosts/:id/delete',requireLogin,adminController.deleteHostRequest);

router.post('/admin/hosts/:id/verify',requireLogin,adminController.verifyHostRequest);


router.get('/admin/properties/view/:id',requireLogin,adminController.showViewProperty);

router.post('/admin/properties/block/:id',requireLogin,adminController.blockProperty);
