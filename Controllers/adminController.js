
const stats = {
    totalUsers: 120,
    totalHosts: 15,
    totalBookings: 87
  };

  // Demo recent bookings
  const recentBookings = [
    { id: 101, user_name: 'Alice Johnson', hotel_name: 'Seaside Resort', room_type: 'Deluxe Room', status: 'confirmed' },
    { id: 102, user_name: 'Bob Smith', hotel_name: 'Mountain Lodge', room_type: 'Suite', status: 'pending' },
    { id: 103, user_name: 'Charlie Davis', hotel_name: 'City Inn', room_type: 'Standard Room', status: 'cancelled' },
    { id: 104, user_name: 'Diana Prince', hotel_name: 'Seaside Resort', room_type: 'Suite', status: 'confirmed' },
    { id: 105, user_name: 'Evan Lee', hotel_name: 'Mountain Lodge', room_type: 'Deluxe Room', status: 'pending' },
  ];

exports.showDashboard=(req,res)=>{
  try {
    res.render('admin/dashboard',{ user: req.session.user || null, stats, recentBookings     });
  } catch (error) {
    console.log(error);
  } 
}
const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'user', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'user', status: 'active' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com', role: 'admin', status: 'inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'user', status: 'active' },
    { id: 5, name: 'Evan Lee', email: 'evan@example.com', role: 'user', status: 'inactive' },
];

exports.showUsers=(req,res)=>{
  try {
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