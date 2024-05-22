import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);
  return result;
};
const getAllOrderFromDB = async (query: TOrder) => {
  const result = await Order.find(query);
  return result;
};

export const OrderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
};
