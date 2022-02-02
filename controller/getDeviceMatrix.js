/* eslint-disable import/extensions */
/* eslint-disable max-len */
import pool from '../dbConfig.js';

// get devices
const getDevices = async (req, res) => {
  const {
    userId,
  } = req.query;
  const sql = 'SELECT * FROM users.device FULL JOIN users."matrixInfo" ON  users.device.device_id = users."matrixInfo".device_id WHERE user_id =  $1;';
  pool.query(sql, [userId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
// get a particular device
const getDevice = async (req, res) => {
  const {
    userId, deviceId,
  } = req.query;
  const sql = 'SELECT * FROM users.device FULL JOIN users."matrixInfo" ON  users.device.device_id = users."matrixInfo".device_id WHERE user_id =  $1 AND device.device_id = $2;';
  pool.query(sql, [userId, deviceId], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};
export { getDevices, getDevice };
