const db=require('../db');


exports.createHost=async (userId,payout_email,bank_account,phone_number) => {
  const query='insert into hosts(user_id,payout_email,bank_account,phone_number) values($1,$2,$3,$4) returning *';
  const result=await db.query(query,[userId,payout_email,bank_account,phone_number]);
  return result.rows[0];
}


exports.hostCount=async (params) => {
  const query='select count(host_id) from hosts'
  const result=await db.query(query);
  return result.rows[0].count
}


exports.getAllHosts=async () => {
 
 const query = `
  SELECT DISTINCT ON (h.host_id)
       h.host_id, h.user_id, u.name, u.email,
       hr.request_id, hr.status, hr.phonenumber, hr.paypal, hr.bankaccount
  FROM hosts h
  JOIN users u ON h.user_id = u.user_id
  JOIN host_requests hr ON h.user_id = hr.user_id
  WHERE hr.status = $1
  ORDER BY h.host_id, hr.request_id DESC
`;

  const result = await db.query(query, ['approved']);
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

exports.searchHosts=async (search) => {
  const query='select * from hosts join users on hosts.user_id = users.user_id where users.name ILIKE $1 or users.email ILIKE $1 ';
  const result=await db.query(query,[`%${search}%`]);
  return result.rows;
}