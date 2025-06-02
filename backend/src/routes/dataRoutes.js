import express from 'express';
import { ingestCustomers, ingestOrders } from '../controllers/dataController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/customers', protect, ingestCustomers);
router.post('/orders', protect, ingestOrders);

export default router;