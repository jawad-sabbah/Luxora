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

exports.getAllPropertiesAndHostId=async()=>{

  const query="SELECT * FROM properties join hosts on properties.host_id=hosts.host_id join users on hosts.user_id=users.user_id order by property_id";
  const result=await db.query(query);
  return result.rows;
}

exports.deleteProperty=async(id)=>{
  const query="delete from properties where property_id=$1";
  await db.query(query,[id]);
}