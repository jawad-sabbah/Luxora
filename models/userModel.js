const db = require('../db');

// Create user
exports.createUser = async (username, email, password) => {
  const query = `
    INSERT INTO users (name, email, hashed_password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, email, password];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Find user by email
exports.findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows[0];
};
