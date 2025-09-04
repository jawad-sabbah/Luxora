const userModel=require('../models/userModel');
const hostModel=require('../models/hostModel');


  // Demo recent bookings
  const recentBookings = [
    { id: 101, user_name: 'Alice Johnson', hotel_name: 'Seaside Resort', room_type: 'Deluxe Room', status: 'confirmed' },
    { id: 102, user_name: 'Bob Smith', hotel_name: 'Mountain Lodge', room_type: 'Suite', status: 'pending' },
    { id: 103, user_name: 'Charlie Davis', hotel_name: 'City Inn', room_type: 'Standard Room', status: 'cancelled' },
    { id: 104, user_name: 'Diana Prince', hotel_name: 'Seaside Resort', room_type: 'Suite', status: 'confirmed' },
    { id: 105, user_name: 'Evan Lee', hotel_name: 'Mountain Lodge', room_type: 'Deluxe Room', status: 'pending' },
  ];

exports.showDashboard=async (req,res)=>{
  try {
    const totalUsers=await userModel.totalUsers();
   const totalHosts=await hostModel.getAllHosts();

    res.render('admin/dashboard',
   { user: req.session.user || null,
     totalUsers,
     totalHosts
   });


    } catch (error) {
    console.log(error);
  } 
}

exports.showUsers=async(req,res)=>{
  try {
   const users= await userModel.getAllUsers();

   if (!users) {
    res.send('no user found')
   }

    res.render('admin/users',{ user: req.session.user || null, users });

  } catch (error) {
    console.log(error);
  } 
}

const hosts=[
  { id: 1, name: 'Host One', email: 'host1@example.com', phone_number: '123-456-7890', verified: true },
  { id: 2, name: 'Host Two', email: 'host2@example.com', phone_number: '123-456-7890', verified: false },
  { id: 3, name: 'Host Three', email: 'host3@example.com', phone_number: '123-456-7890', verified: true },
  { id: 4, name: 'Host Four', email: 'host4@example.com', phone_number: '123-456-7890', verified: false },
  { id: 5, name: 'Host Five', email: 'host5@example.com', phone_number: '123-456-7890', verified: true },
];

exports.showHosts=(req,res)=>{
  try {
    res.render('admin/hosts',{ user: req.session.user || null, hosts });
  } catch (error) {
    console.log(error);
  } 
}

const properties=[
   { id: 1, property_name: 'Beach House', host_name: 'Host One', city: 'Miami', status: 'active' },
   { id: 2, property_name: 'Mountain Cabin', host_name: 'Host Two', city: 'Denver', status: 'inactive' },
   { id: 3, property_name: 'City Apartment', host_name: 'Host Three', city: 'New York', status: 'active' },
   { id: 4, property_name: 'Countryside Villa', host_name: 'Host Four', city: 'Austin', status: 'inactive' },
   { id: 5, property_name: 'Lakeside Lodge', host_name: 'Host Five', city: 'Seattle', status: 'active' },
]

exports.showProperties=async (req,res) => {
  try {
    res.render('admin/properties',{ user: req.session.user || null, properties });
  } catch (error) {
    console.log(error);
  } 
}


const bookings=[
  { id: 101, user_name: 'Alice Johnson', hotel_name: 'Seaside Resort', room_type: 'Deluxe Room', status: 'confirmed' },
  { id: 102, user_name: 'Bob Smith', hotel_name: 'Mountain Lodge', room_type: 'Suite', status: 'pending' },
  { id: 103, user_name: 'Charlie Davis', hotel_name: 'City Inn', room_type: 'Standard Room', status: 'cancelled' },
  { id: 104, user_name: 'Diana Prince', hotel_name: 'Seaside Resort', room_type: 'Suite', status: 'confirmed' },
  { id: 105, user_name: 'Evan Lee', hotel_name: 'Mountain Lodge', room_type: 'Deluxe Room', status: 'pending' },
]

exports.showBookings=(req,res)=>{ 
  try {
    res.render('admin/bookings',{ user: req.session.user || null, bookings: recentBookings });
  } catch (error) {
    console.log(error);
  } 
}





exports.showVerifyHosts=(req,res)=>{
  try {
    
   res.render('admin/verify-host',{hosts})

  } catch (error) {
    console.log(error);
  }
}


exports.showConfirmVerifyHost=async (req,res) => {
  try {
    const host = hosts.find(h => h.id === parseInt(req.params.id));
    if (!host) {
      return res.status(404).send('Host not found');
    }
    res.render('admin/confirm-verify',{ user: req.session.user || null, host });
  } catch (error) {
    console.log(error);
  }
}

exports.verifyHost=async (req,res) => {
  try {
    res.redirect('/admin/hosts');
  } catch (error) {
    console.log(error);
  }
}

exports.cancelHostVerification=async (req,res) => {
 
  try {
    res.redirect('/admin/hosts');
  } catch (error) {
    console.log(error);
  }

}



exports.showEditHost=async (req,res) => {

 try {
   const host = hosts.find(h => h.id === parseInt(req.params.id));
   if (!host) {
     return res.status(404).send('Host not found');
   }
   res.render('admin/edit-host',{ user: req.session.user || null , host });
 } catch (error) {
  console.log(error);
 }
}


exports.editHost=async (req,res) => {
 
  try {
    res.redirect('/admin/hosts');
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
    const {name,email,role}=req.body;
    const userId=req.params.id;
    const user=await userModel.updateUser(name,email,role,userId);
    
    
    if (!user) {
      return res.status(404).send('User not found');
    }

    
    res.redirect('/admin/users');
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