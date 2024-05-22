/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { Product } from '../product/product.model';
import orderValidationSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const product = await Product.findById(payload.productId);
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
      return;
    }
    if (
      product.inventory.quantity < payload.quantity ||
      !product.inventory.inStock
    ) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      });
      return;
    }
    product.inventory.quantity -= payload.quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    await product.save();
    const zodData = orderValidationSchema.parse(payload);
    const result = await OrderService.createOrderIntoDB(zodData);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};
const getAllOrder = async (req: Request, res: Response) => {
  try {
    let query: any = {};
    const email = req.query.email;
    if (email) {
      query = { email };
    }
    const result = await OrderService.getAllOrderFromDB(query);

    if (!result || result.length === 0) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (!email) {
      res.status(200).json({
        success: true,
        message: 'Orders fetched successfully!',
        data: result,
      });
    } else {
      res.status(200).json({
        success: true,
        message: `Orders fetched successfully for ${email}!`,
        data: result,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: err,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
};
