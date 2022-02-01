/* eslint-disable import/extensions */
/* eslint-disable max-len */
// add device matrixinfo
import pool from '../dbConfig.js';

const addMatrix = async (req, res) => {
  const {
    cpuAppUsage, avgMemoryUsage, avgPowerUsage, avgGpuUsage,
  } = req.body;
  const sql = 'INSERT INTO users."matrixInfo"(session_id, cpu_app_usage, avg_memory_usage, avg_power_usage, avg_gpu_usage, device_id) VALUES ($1,$2,$3,$4,$5,$6)';
  pool.query(sql, [req.session.sessionID, cpuAppUsage, avgMemoryUsage, avgPowerUsage, avgGpuUsage, req.session.deviceId]);
  return res.status(200).json({
    message: 'new device matrix info added',
  });
};
export default addMatrix;
