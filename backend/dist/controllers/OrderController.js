"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
class OrderController {
    static async checkout(req, res) {
        try {
            const { customerName, customerEmail, shippingAddress, items, promoCode, paymentMethod } = req.body;
            const userId = req.user?.id;
            if (!items || !Array.isArray(items) || items.length === 0) {
                return res.status(400).json({ message: 'Cart is empty' });
            }
            const order = await OrderService_1.OrderService.createOrder({
                userId,
                customerName,
                customerEmail,
                shippingAddress,
                items,
                promoCode,
                paymentMethod
            });
            res.status(201).json({
                message: 'Order placed successfully',
                orderId: order._id,
                total: order.totalAmount
            });
        }
        catch (error) {
            console.error('Checkout error:', error);
            res.status(500).json({ message: 'Failed to process order', error: error.message });
        }
    }
    static async getOrderDetails(req, res) {
        try {
            const { id } = req.params;
            const order = await OrderService_1.OrderService.getOrderById(id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching order', error: error.message });
        }
    }
    static async listOrders(req, res) {
        try {
            const orders = await OrderService_1.OrderService.getAllOrders();
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(500).json({ message: 'Error listing orders', error: error.message });
        }
    }
    static async updateStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const order = await OrderService_1.OrderService.updateOrderStatus(id, status);
            res.status(200).json(order);
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating order', error: error.message });
        }
    }
    static async getMyOrders(req, res) {
        try {
            const { email } = req.query;
            // In a real app, we'd use req.user.id but since the checkout allows guest (with email), 
            // we'll support both for this demo.
            const lookupEmail = email?.toString();
            if (!lookupEmail)
                return res.status(400).json({ message: 'Email required' });
            const orders = await OrderService_1.OrderService.getOrdersByEmail(lookupEmail);
            res.status(200).json(orders);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching history', error: error.message });
        }
    }
}
exports.OrderController = OrderController;
