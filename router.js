/* eslint-disable import/extensions */
import express from 'express';
import device from './controller/addDevice.js';
import addMatrix from './controller/matrixInfo.js';
import { getDevices, getDevice } from './controller/getDeviceMatrix.js';

const router = express.Router();

// new device
router.post('/device', device);
// new matrix
router.post('/matrixinfo', addMatrix);
// get devices
router.get('/getdevices', getDevices);
// get a particular devices
router.get('/getdevice', getDevice);

export default router;
