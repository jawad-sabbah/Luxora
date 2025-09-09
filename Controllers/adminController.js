const userModel=require('../models/userModel');
const hostModel=require('../models/hostModel');
const propertyModel=require('../models/propertyModel')
const bookingModel=require('../models/bookingModel')

 
exports.showDashboard=async (req,res)=>{
  try {
    const totalUsers=await userModel.totalUsers();
    const totalHosts=await hostModel.hostCount();
    const totalBooking=await bookingModel.bookCount()

   

    res.render('admin/dashboard',
   { user: req.session.user || null,
     totalUsers,
     totalHosts,
     totalBooking
   });


    } catch (error) {
    console.log(error);
  } 
}

exports.showUsers=async(req,res)=>{
  try {
   let users;
   const search=req.query.search

  if (search) {
    users=await userModel.searchUsers(search)
  }
else{
  users=await userModel.getAllUsers()

   if (!users) {
    res.send('no user found')
   }

}
    res.render('admin/users',{ user: req.session.user || null, users,search });

  } catch (error) {
    console.log(error);
  } 
}

exports.showViewUser=async (req,res) => {

  try {

    
  const userId=req.params.id;
  const user=await userModel.getUserById(userId);
  
  
   if (!user) {
     return res.status(404).send('User not found');
   }

    res.render('admin/view-user', {  user });
  } catch (error) {
    console.log(error);
  }

}


exports.showEditUser=async (req,res) => {
  try {
   const userId=req.params.id;
   const user=await userModel.getUserById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }
   
    
    res.render('admin/edit-user',{  user });
  } catch (error) {
     console.log(error);
  }
}


exports.editUser=async (req,res) => {
  try {
    const {name,email,role,verified}=req.body;
    const userId=req.params.id;
    const user=await userModel.updateUser(name,email,role,userId,verified);
    
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    res.redirect('/admin/users');
  } catch (error) {
    console.log(error);
    
  }
}





exports.deleteUser=async (req,res) => {
  try {
    const userId=req.params.id;
    const user=await userModel.deleteUser(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.redirect('/Admin/users');
  } catch (error) {
    console.log(error);
  }
}



exports.showHosts=async (req,res)=>{
 

  try {
    const search=req.query.search
    let hosts  
    console.log(search);
    
    

    if (search) {
      hosts=await hostModel.searchHosts(search)
    
      
    } else {
      hosts=await hostModel.getAllHosts();
    }
      
      
    
    res.render('admin/hosts',{ user: req.session.user || null, hosts ,search});
  } catch (error) {
    console.log(error);
  } 
}

exports.verifyHost=async (req,res) => {
  
  const hostId=req.params.id;
  try {
     await hostModel.verifyHost(hostId);
     res.redirect('/admin/hosts');
  } catch (error) {
    console.log(error);
  }
}

exports.showEditHost=async (req,res) => {

 try {
   const hostId=req.params.id;
   const host=await hostModel.getHostById(hostId);
   if (!host) {
     return res.status(404).send('Host not found');
   }
   res.render('admin/edit-host',{ user: req.session.user || null , host });
 } catch (error) {
  console.log(error);
 }
}


exports.editHost=async (req,res) => {
   
  const hostId=req.params.id;
  const {payout_email,bank_account,phone_number}=req.body;

  try {
    await hostModel.updateHost(payout_email, bank_account, phone_number, hostId);
    res.redirect('/admin/hosts');
  } catch (error) {
    console.log(error);
  }

}


exports.deleteHost=async (req,res) => {
  const hostId=req.params.id;
  try {
    await hostModel.deleteHost(hostId);
    res.redirect('/admin/hosts');
  } catch (error) {
    console.log(error);
  } 
}


exports.showHostRequests=async (req,res) => {
  try {
    const unVerifiedHosts=await hostModel.getUnVerifiedHosts();
    if (!unVerifiedHosts) {
      res.send('no hosts found')
    }
    res.render('admin/pending-hosts',{ user: req.session.user || null, hosts:unVerifiedHosts });
  } catch (error) {
    console.log(error);
  }   
}



exports.deleteHostRequest=async (req,res) => {
     const hostId=req.params.id
  try {
    await hostModel.deleteHostRequest(hostId);
    res.redirect('/admin/hostsRequests');
  } catch (error) {
    console.log(error);
  }
}









exports.showProperties=async (req,res) => {
  try {
     const properties=await propertyModel.getAllPropertiesAndHostId();

    res.render('admin/properties',{ user: req.session.user || null, properties });
  } catch (error) {
    console.log(error);
  } 
}

exports.showViewProperty=async (req,res) => {

  try {
    const property = properties.find(p => p.id === parseInt(req.params.id));
    if (!property) {
      return res.status(404).send('Property not found');
    }
    res.render('admin/view-property', { user: req.session.user || null, property });
  } catch (error) {
    console.log(error);
  }

}

exports.blockProperty=async (req,res) => {
  try {
    const propertyId=req.params.id;
    await propertyModel.deleteProperty(propertyId);
    res.redirect('/admin/properties');
  } catch (error) {
    console.log(error);
  }   
}




exports.showBookings=async(req,res)=>{ 
  try {
    const booking=await bookingModel.getAllBooking();
   
    
    res.render('admin/bookings',{ user: req.session.user || null, bookings: booking });
  } catch (error) {
    console.log(error);
  } 
}


















