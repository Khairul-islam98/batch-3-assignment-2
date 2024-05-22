import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
// create order model
const orderSchema = new Schema<TOrder>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});
// orders model is connected to database
export const Order = model<TOrder>('Order', orderSchema);
