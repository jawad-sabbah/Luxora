const propertyModel=require('../models/propertyModel');
const roomModel=require('../models/roomModel');
const userModel=require('../models/userModel');
const bookingModel=require('../models/bookingModel')

/*
const dummyData=[
  { id: 1, name: "Seaside Resort", location: "Beirut, Lebanon", price: 120, image: "/images/hotel_demo_images/SeaSide.jpg" },
  { id: 2, name: "Mountain Escape", location: "Faraya, Lebanon", price: 95, image: "/images/hotel_demo_images/faraya.jpg" },
  { id: 3, name: "City Lights Hotel", location: "Beirut, Lebanon", price: 150, image: "/images/hotel_demo_images/cityLight.jpg" },
  { id: 4, name: "Cozy Cottage", location: "Byblos, Lebanon", price: 80, image: "/images/hotel_demo_images/Cottage.jpg" },
  { id: 5, name: "Luxury Suite", location: "Jounieh, Lebanon", price: 200, image: "/images/hotel_demo_images/Luxary.jpg" }
]
*/

exports.getAllHotels=async(req,res)=>{
  try {
       const properties= await propertyModel.getAllProperties()
       
       
       res.render('Hotels/hotels', { 
        hotels: properties ,
        username: req.session.user ? req.session.user.email : null });

  } catch (error) {
    console.log(error);
  }
}

/*
  const hotel = {
    id: 1,
    name: "Seaside Resort",
    location: "Beirut, Lebanon",
    banner: "/images/hotel_demo_images/SeaSide.jpg",
    description: "A luxury hotel by the sea with premium rooms and spa services.",
    gallery: ["/images/hotel_demo_images/gallery/SeaSide_Gallery.jpg", "/images/hotel_demo_images/gallery/SeaSide_Gallery_2.jpg", "/images/hotel_demo_images/gallery/SeaSide_Gallery_3.jpg"],
    rating: 4.5,
    rooms: [
      { id: 101, type: "Deluxe Room", price: 120, amenities: ["WiFi", "AC", "Balcony"] },
      { id: 102, type: "Suite", price: 200, amenities: ["WiFi", "AC", "Ocean View", "Jacuzzi"] }
    ]
  };
   */

exports.getHotelById=async(req,res)=>{
  try {
     const propertyId=req.params.id;
     const hotel= await propertyModel.getPropertyById(propertyId);
     const rooms= await roomModel.listRoomsWithAmentities(propertyId);
     //list the rooms with amenities for this property
     
     

  res.render('Hotels/details', { hotel, rooms });

  } catch (error) {
    console.log(error);
  }
}

exports.getBookRoom=async (req,res) => {
  try {
    const roomId = req.params.roomId;
    const room = await roomModel.getRoomById(roomId);
   
    

    const hotel = await propertyModel.getPropertyById(room.property_id);
    const gallery=await roomModel.listRoomGallery(roomId);
    const amenities=await roomModel.getRoomAmentities(roomId);
    const roomDetails =await roomModel.getRoomDetails(roomId);
    const user= await userModel.getUserById(req.session.user.id);
    res.render('Hotels/book-now', { room, hotel, gallery, roomDetails, user,amenities });

    console.log(hotel);


  } catch (error) {
    console.log(error);
  }
}



exports.bookRoom = async (req, res) => {
  const userId = req.session.user.id;
  const { hotelId, roomId } = req.params;
  const {
    numGuests,
    requests,
    payment_method,
    credit_card_number,
    paypal_email,
    bank_account_number
  } = req.body;

  // Decide which payment account to store
  let payment_account = null;
  if (payment_method === 'Credit Card') payment_account = credit_card_number;
  else if (payment_method === 'PayPal') payment_account = paypal_email;
  else if (payment_method === 'Bank Transfer') payment_account = bank_account_number;

  try {
    const booking = await bookingModel.createBooking(
      userId,
      hotelId,
      roomId,
      numGuests,
      requests,
      payment_method,
      payment_account
    );

      if (booking) {
        roomModel.updateRoomAvailability('not avaiable',roomId); // Mark room as unavailable
      }

    console.log(await roomModel.updateRoomAvailability('not avaiable',roomId));
    

    res.redirect(`/Hotels/receipt/${booking.booking_id}`); // use returned booking ID
  } catch (error) {
    console.error(error);
    res.status(500).send('Error booking room');
  }
};


exports.getReceipt = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await bookingModel.getBookingById(bookingId);
    
    

    console.log(booking);
    

    if (!booking) return res.status(404).send('Booking not found');

    res.render('Hotels/receipt', { booking });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error loading receipt');
  }
};
