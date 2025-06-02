import mongoose from 'mongoose';

const communicationLogSchema = new mongoose.Schema({
  campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  message: { type: String },
  status: { type: String, enum: ['SENT', 'FAILED'], default: 'SENT' },
  vendorResponseId: { type: String },
  sentAt: { type: Date, default: Date.now }
});

export default mongoose.model('CommunicationLog', communicationLogSchema);