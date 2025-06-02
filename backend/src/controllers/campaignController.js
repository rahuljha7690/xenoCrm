import Campaign from '../models/Campaign.js';
import CommunicationLog from '../models/CommunicationLog.js';
import Customer from '../models/Customer.js';

export const createCampaign = async (req, res) => {
  const { name, rules } = req.body;
  const userId = req.user.id;

  const customers = await Customer.find({ totalSpend: { $gt: 10000 }, visitCount: { $lt: 3 } });

  const campaign = await Campaign.create({ name, createdBy: userId, rules, audienceSize: customers.length });

  const logs = await Promise.all(
    customers.map(async (customer) => {
      const log = await CommunicationLog.create({
        campaign: campaign._id,
        customer: customer._id,
        message: `Hi ${customer.name}, here’s 10% off on your next order!`,
        status: 'SENT'
      });
      return log;
    })
  );

  res.status(201).json({ campaign, logs });
};

export const getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find({ createdBy: req.user.id })
    .sort({ createdAt: -1 })
    .populate('createdBy', 'email');

  res.json(campaigns);
};

export const getCampaignStats = async (req, res) => {
  const campaignId = req.params.id;
  const logs = await CommunicationLog.find({ campaign: campaignId });

  const stats = {
    sent: logs.filter(l => l.status === 'SENT').length,
    failed: logs.filter(l => l.status === 'FAILED').length,
    audienceSize: logs.length,
  };

  res.json(stats);
};
