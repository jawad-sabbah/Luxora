const db=require('../db')


exports.listRoomsWithAmentities = async (propertyId) => {
  const query = `
    SELECT 
      r.room_id,
      r.property_id,
      r.type,
      r.price_per_night,
      r.description,
      r.status,
      COALESCE(json_agg(a.name) FILTER (WHERE a.name IS NOT NULL), '[]') AS amenities
    FROM rooms r
    LEFT JOIN room_amenities a ON r.room_id = a.room_id
    WHERE r.property_id = $1
    GROUP BY r.room_id
    ORDER BY r.room_id;
  `;

  const result = await db.query(query, [propertyId]);
  return result.rows;
};
