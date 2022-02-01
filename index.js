/* eslint-disable import/extensions */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import pool from './dbConfig.js';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(session({
  secret: 'sessionsecretid',
  resave: true,
  saveUninitialized: true,
  maxAge: 3600000 * 2, // 1 hour (in milliseconds)
}));

// create device
app.post('/device', (req, res) => {
  const {
    deviceId, deviceName, androdiVersion, startTime, endTime, versionName, appName, recordDuration,
  } = req.body;
  const sql = 'INSERT INTO users.device( device_id,device_name,androdi_version,start_time,end_time,version_name,app_name,record_duration) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';
  pool.query(sql, [deviceId, deviceName, androdiVersion, startTime, endTime, versionName, appName, recordDuration]);
  req.session.deviceId = req.body.deviceId;
  req.session.sessionID = Math.random() * 10;
  return res.status(200).json({
    message: 'new device added',
  });
});

// add device matrixinfo
app.post('/matrixinfo', (req, res) => {
  const {
    cpuAppUsage, avgMemoryUsage, avgPowerUsage, avgGpuUsage,
  } = req.body;
  const sql = 'INSERT INTO users."matrixInfo"(session_id, cpu_app_usage, avg_memory_usage, avg_power_usage, avg_gpu_usage, device_id) VALUES ($1,$2,$3,$4,$5,$6)';
  pool.query(sql, [req.session.sessionID, cpuAppUsage, avgMemoryUsage, avgPowerUsage, avgGpuUsage, req.session.deviceId]);
  return res.status(200).json({
    message: 'new device matrix info added',
  });
});

// // delete session
// app.get('/delete', (req) => {
//   req.session.destroy();
//   console.log('session deleted');
// });

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server is listening to port ${port} `); });
