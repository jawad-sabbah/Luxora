
const dummyData=[
  { id: 1, name: "Seaside Resort", location: "Beirut, Lebanon", price: 120, image: "/images/hotel_demo_images/SeaSide.jpg" },
  { id: 2, name: "Mountain Escape", location: "Faraya, Lebanon", price: 95, image: "/images/hotel_demo_images/faraya.jpg" },
  { id: 3, name: "City Lights Hotel", location: "Beirut, Lebanon", price: 150, image: "/images/hotel_demo_images/cityLight.jpg" },
  { id: 4, name: "Cozy Cottage", location: "Byblos, Lebanon", price: 80, image: "/images/hotel_demo_images/Cottage.jpg" },
  { id: 5, name: "Luxury Suite", location: "Jounieh, Lebanon", price: 200, image: "/images/hotel_demo_images/Luxary.jpg" }
]

exports.getAllHotels=(req,res)=>{
  try {
      res.render('Hotels/hotels', { hotels: dummyData })
  } catch (error) {
    console.log(error);
  }
}

exports.getHotelById=(req,res)=>{
  try {
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

  res.render('Hotels/details', { hotel });
    
  } catch (error) {
    console.log(error);
  }
}