import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rules: { type: Object, required: true },
  audienceSize: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Campaign', campaignSchema);
