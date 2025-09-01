const db=require('../db');


// show all properties

exports.getAllProperties=async()=>{

  const query="SELECT * FROM properties join property_gallery on properties.property_id=property_gallery.property_id";
  const result=await db.query(query);
  return result.rows;
  
}

exports.getPropertyById=async(id)=>{
  const query="SELECT * FROM properties join property_gallery on properties.property_id=property_gallery.property_id where properties.property_id=$1";
  const result=await db.query(query,[id]);
  return result.rows[0];
}