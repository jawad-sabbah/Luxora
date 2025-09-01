const db=require('../db');


// show all properties

exports.getAllProperties=async()=>{

  const query="SELECT * FROM properties join property_gallery on properties.property_id=property_gallery.property_id";
  const result=await db.query(query);
  return result.rows;
  
}