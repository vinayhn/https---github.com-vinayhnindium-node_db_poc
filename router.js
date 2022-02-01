/* eslint-disable import/extensions */
import express from 'express';
import device from './controller/addDevice.js';
import addMatrix from './controller/matrixInfo.js';

const router = express.Router();

// new device
router.post('/device', device);
// new matrix
router.post('/matrixinfo', addMatrix);

export default router;
