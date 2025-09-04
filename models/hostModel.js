const db=require('../db');

exports.getAllHosts=async () => {
  const query='select * from hosts order by host_id';
  const result = await db.query(query);
  return result.rows.length;
};