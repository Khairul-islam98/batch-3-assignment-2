import { TOrder } from './order.interface';
import { Order } from './order.model';

// create a new order in the database
const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};
// all orders show and specific orders email query
const getAllOrderFromDB = async (query: TOrder) => {
  const result = await Order.find(query);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
