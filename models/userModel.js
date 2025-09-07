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

exports.getUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE user_id = $1";
  const result = await db.query(query, [userId]);
  return result.rows[0];
};

exports.getAllUsers = async () => {
  const query = 'SELECT * FROM users order by user_id ';
  const result = await db.query(query);
  return result.rows;
};

exports.updateUser=async (name,email,role,userId) => {
  const query='update users set name=$1,email=$2,role=$3 where user_id=$4';
  const result=await db.query(query,[name,email,role,userId])
  return result.rows;

}

exports.deleteUser=async (id) => {
  const query='delete from users where user_id=$1';
  const result=await db.query(query,[id])
  return result.rows;
}

exports.totalUsers=async () => {
  const query='select count(*) from users';
  const result=await db.query(query);
  return result.rows[0].count;
}


exports.searchUsers=async (search) => {
  const query='select * from users where name ILIKE $1 or email ILIKE $1';
  const result=await db.query(query,[`%${search}%`]);
  return result.rows;
}