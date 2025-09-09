const db = require('../db'); // your pg pool connection

exports.createBooking = async (
  userId,
  propertyId,
  roomId,
  numGuests,
  requests,
  payment_method,
  payment_account
) => {
  try {
    const query = `
      INSERT INTO bookings
        (user_id, property_id, room_id,guest, special_requests, payment_method, payment_account)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      userId,
      propertyId,
      roomId,
      numGuests,
      requests,
      payment_method,
      payment_account
    ];

    const result = await db.query(query, values);

    return result.rows[0]; // return the inserted booking
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

exports.getBookingById = async (bookingId) => {
  try {
    const query = `
      SELECT b.*, h.property_name, r.type AS room_type
      FROM bookings b
      JOIN properties h ON b.property_id = h.property_id
      JOIN rooms r ON b.room_id = r.room_id
      WHERE b.booking_id = $1
    `;
    const result = await db.query(query, [bookingId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching booking:', error);
    throw error;
  }
};


exports.bookCount=async () => {
  const query='select count(booking_id) from bookings'
  const result=await db.query(query);
  return result.rows[0].count
}

exports.getAllBooking=async (params) => {
  try {
    const query='select * from bookings join users on bookings.user_id=users.user_id join properties on bookings.property_id=properties.property_id join rooms on bookings.room_id=rooms.room_id order by booking_id ASC';
    const result=await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching all bookings:', error);
    throw error;
  }
}