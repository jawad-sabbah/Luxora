const db=require('../db/index')


exports.createRequest=async (userID,status,phoneNumber,paypal,bankAccount) => {
  const query='insert into host_requests(user_id,status,phonenumber,paypal,bankaccount) values($1,$2,$3,$4,$5)'
  const result=await db.query(query,[userID,status,phoneNumber,paypal,bankAccount])
}


exports.showAllRequests=async () => {
  const query="select * from host_requests join users on host_requests.user_id = users.user_id where status='pending'"
  const result=await db.query(query);
  return result.rows
}

exports.verifyHostRequest=async (requestId) => {
  const query='update host_requests set status=$1 where request_id=$2 returning *'
  const result=await db.query(query,['approved',requestId]);
  return result.rows[0]
}


exports.deleteHostRequest=async (reqId) => {
  const query="update host_requests set status='rejected' where request_id=$1"
  const result=db.query(query,[reqId]);
}

exports.countRequests=async () => {
  const query="select count(request_id) from host_requests where status='pending'"
  const result=await db.query(query);
  return result.rows[0].count
}