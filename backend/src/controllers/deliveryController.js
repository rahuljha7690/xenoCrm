import CommunicationLog from '../models/CommunicationLog.js';

export const vendorAPI = async (req, res) => {
  const { messageId } = req.body;
  const status = Math.random() > 0.1 ? 'SENT' : 'FAILED';

  // Simulate async callback
  setTimeout(async () => {
    await fetch('http://localhost:5000/api/delivery/receipt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId, status })
    });
  }, 1000);

  res.status(200).json({ status, message: 'Delivery simulated' });
};

export const deliveryReceipt = async (req, res) => {
  const { messageId, status } = req.body;
  await CommunicationLog.findByIdAndUpdate(messageId, { status });
  res.status(200).json({ message: 'Status updated' });
};
