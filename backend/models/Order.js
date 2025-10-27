import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  month: { type: String, required: true },
  orders: { type: Number, required: true }
});

export default mongoose.model('Order', OrderSchema);
