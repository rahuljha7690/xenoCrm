import express from 'express';
import { vendorAPI, deliveryReceipt } from '../controllers/deliveryController.js';

const router = express.Router();

router.post('/send', vendorAPI);
router.post('/receipt', deliveryReceipt);

export default router;