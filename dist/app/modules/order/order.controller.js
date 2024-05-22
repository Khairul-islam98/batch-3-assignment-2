"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const product_model_1 = require("../product/product.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const product = yield product_model_1.Product.findById(payload.productId);
        if (!product) {
            res.status(404).json({
                success: false,
                message: 'Product not found',
            });
            return;
        }
        if (product.inventory.quantity < payload.quantity ||
            !product.inventory.inStock) {
            res.status(400).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
            return;
        }
        product.inventory.quantity -= payload.quantity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        const result = yield order_service_1.OrderService.createOrderIntoDB(payload);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        const email = req.query.email;
        if (email) {
            query = { email };
        }
        const result = yield order_service_1.OrderService.getAllOrderFromDB(query);
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
        }
        else {
            res.status(200).json({
                success: true,
                message: `Orders fetched successfully for ${email}!`,
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: err,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
};
