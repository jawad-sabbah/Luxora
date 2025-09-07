const propertyModel=require('../models/propertyModel');
const roomModel=require('../models/roomModel');
const userModel=require('../models/userModel');

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
     const id=req.params.id;
     const hotel= await propertyModel.getPropertyById(id);
     const rooms= await roomModel.listRoomsWithAmentities(id);
     const gallery= await roomModel.listRoomGallery(id);
   
     console.log(gallery);
     

  res.render('Hotels/details', { hotel, rooms, gallery });

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
    const room_amenities=await roomModel.listRoomsWithAmentities(roomId);
    const user= await userModel.getUserById(req.session.user.id);
    res.render('Hotels/book-now', { room, hotel, gallery, room_amenities, user });

    console.log(room);
    
  } catch (error) {
    console.log(error);
  }
}