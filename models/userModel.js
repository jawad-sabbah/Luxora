const db = require('../db');

// Create user
exports.createUser = async (username, email, password, role) => {
  const query = `
    INSERT INTO users (name, email, hashed_password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [username, email, password, role];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Find user by email
exports.findUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const result = await db.query(query, [email]);
  return result.rows[0];
};
