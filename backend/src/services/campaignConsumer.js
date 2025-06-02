import { redisClient } from '../config/redis.js';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';

const streamKeys = ['customers_stream', 'orders_stream'];
const lastIds = { customers_stream: '0', orders_stream: '0' };

const persistCustomer = async (data) => {
  try {
    const parsed = JSON.parse(data);
    await Customer.create(parsed);
  } catch (error) {
    console.error('Customer insert error:', error);
  }
};

const persistOrder = async (data) => {
  try {
    const parsed = JSON.parse(data);
    await Order.create(parsed);
  } catch (error) {
    console.error('Order insert error:', error);
  }
};

const handlers = {
  customers_stream: persistCustomer,
  orders_stream: persistOrder
};

const campaignConsumer = async () => {
  console.log('🚀 Redis consumer started...');
  while (true) {
    try {
      const result = await redisClient.xRead(
        streamKeys.map(stream => ({ key: stream, id: lastIds[stream] })),
        { BLOCK: 5000, COUNT: 10 }
      );

      if (result) {
        for (const { name: stream, messages } of result) {
          for (const { id, message } of messages) {
            const handler = handlers[stream];
            if (handler) await handler(message.data);
            lastIds[stream] = id;
          }
        }
      }
    } catch (err) {
      console.error('Redis stream error:', err);
    }
  }
};

export default campaignConsumer;