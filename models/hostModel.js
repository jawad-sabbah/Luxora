const db=require('../db');

exports.hostCount=async (params) => {
  const query='select count(host_id) from hosts'
  const result=await db.query(query);
  return result.rows[0].count
}


exports.getAllHosts=async () => {
  const query='select * from hosts join users on hosts.user_id = users.user_id order by host_id';
  const result = await db.query(query);
  return result.rows;
};  

exports.getHostById=async (hostId) => {
  const query='select * from hosts join users on hosts.user_id = users.user_id where hosts.host_id=$1';
  const result = await db.query(query, [hostId]);
  return result.rows[0];
};


exports.updateHost=async (payout_email, bank_account, phone_number, hostId) => {
  const query='update hosts set payout_email=$1, bank_account=$2, phone_number=$3 where host_id=$4';
  await db.query(query, [payout_email, bank_account, phone_number, hostId]);
};

exports.getUnVerifiedHosts=async () => {
  const query= 'select * from hosts join users on hosts.user_id=users.user_id where verified=false';
  const result= await db.query(query);
  return result.rows
}

exports.verifyHost=async (hostId) => {
  const query='update hosts set verified=true where host_id=$1';
  await db.query(query, [hostId]);
};


exports.deleteHost=async (hostId) => {
  const query='delete from hosts where host_id=$1';
  await db.query(query, [hostId]);
  
}

exports.searchHosts=async (search) => {
  const query='select * from hosts join users on hosts.user_id = users.user_id where users.name ILIKE $1 or users.email ILIKE $1 ';
  const result=await db.query(query,[`%${search}%`]);
  return result.rows;
}