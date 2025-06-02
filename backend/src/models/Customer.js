import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  lastActive: { type: Date },
  totalSpend: { type: Number, default: 0 },
  visitCount: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Customer', customerSchema);



