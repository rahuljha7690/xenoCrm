import { redisClient } from '../config/redis.js';

export const ingestCustomers = async (req, res) => {
  const customers = req.body;
  if (!Array.isArray(customers)) return res.status(400).json({ message: 'Expected array of customers' });

  for (const customer of customers) {
    await redisClient.xAdd('customers_stream', '*', { data: JSON.stringify(customer) });
  }

  res.status(202).json({ message: 'Customer data queued' });
};

export const ingestOrders = async (req, res) => {
  const orders = req.body;
  if (!Array.isArray(orders)) return res.status(400).json({ message: 'Expected array of orders' });

  for (const order of orders) {
    await redisClient.xAdd('orders_stream', '*', { data: JSON.stringify(order) });
  }

  res.status(202).json({ message: 'Order data queued' });
};