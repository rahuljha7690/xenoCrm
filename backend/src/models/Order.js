import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);