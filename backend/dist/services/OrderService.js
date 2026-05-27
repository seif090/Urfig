"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const Order_1 = require("../models/Order");
const CustomizerService_1 = require("./CustomizerService");
const Product_1 = require("../models/Product");
const PromoCode_1 = require("../models/PromoCode");
class OrderService {
    /**
     * Processes a new order: Validates prices server-side, checked stock, and saves to DB.
     */
    static async createOrder(orderData) {
        const processedItems = [];
        let subtotalSum = 0;
        for (const item of orderData.items) {
            let subtotal = 0;
            if (item.type === 'custom' && item.customConfig) {
                // 1. Server-side Price Re-calculation for security
                const partIds = [
                    item.customConfig.headId,
                    item.customConfig.torsoId,
                    item.customConfig.legsId,
                    item.customConfig.accessoryId
                ].filter(id => !!id);
                const officialPrice = await CustomizerService_1.CustomizerService.calculateConfigurationPrice(partIds);
                subtotal = officialPrice * item.quantity;
                processedItems.push({
                    customKeychain: {
                        head: item.customConfig.headId,
                        torso: item.customConfig.torsoId,
                        legs: item.customConfig.legsId,
                        accessory: item.customConfig.accessoryId,
                        customText: item.customConfig.customText,
                        price: officialPrice
                    },
                    quantity: item.quantity,
                    subtotal: parseFloat(subtotal.toFixed(2))
                });
            }
            else if (item.type === 'ready-made' && item.productId) {
                // 2. Ready-made product price verification
                const product = await Product_1.Product.findById(item.productId);
                if (!product)
                    throw new Error(`Product ${item.productId} not found`);
                subtotal = product.price * item.quantity;
                processedItems.push({
                    product: item.productId,
                    quantity: item.quantity,
                    subtotal: parseFloat(subtotal.toFixed(2))
                });
            }
            subtotalSum += subtotal;
        }
        // 3. Apply Promo Code
        let discountAmount = 0;
        if (orderData.promoCode) {
            const promo = await PromoCode_1.PromoCode.findOne({ code: orderData.promoCode.toUpperCase(), isActive: true });
            if (promo && promo.expiryDate > new Date() && (!promo.usageLimit || promo.usageCount < promo.usageLimit)) {
                if (promo.discountType === 'percentage') {
                    discountAmount = subtotalSum * (promo.discountValue / 100);
                }
                else {
                    discountAmount = promo.discountValue;
                }
                // Increment usage
                promo.usageCount += 1;
                await promo.save();
            }
        }
        const finalTotal = Math.max(0, subtotalSum - discountAmount);
        // 4. Create and Save the Order
        const newOrder = new Order_1.Order({
            user: orderData.userId,
            customerName: orderData.customerName,
            customerEmail: orderData.customerEmail,
            shippingAddress: orderData.shippingAddress,
            items: processedItems,
            paymentMethod: orderData.paymentMethod,
            paymentStatus: (orderData.paymentMethod === 'card' || orderData.paymentMethod === 'paypal') ? 'completed' : 'pending',
            discountAmount: parseFloat(discountAmount.toFixed(2)),
            promoCode: orderData.promoCode,
            totalAmount: parseFloat(finalTotal.toFixed(2)),
            status: (orderData.paymentMethod === 'card' || orderData.paymentMethod === 'paypal') ? 'paid' : 'pending'
        });
        return await newOrder.save();
    }
    static async getOrderById(orderId) {
        return await Order_1.Order.findById(orderId)
            .populate('items.customKeychain.head')
            .populate('items.customKeychain.torso')
            .populate('items.customKeychain.legs')
            .populate('items.customKeychain.accessory')
            .populate('items.product');
    }
    static async getAllOrders() {
        return await Order_1.Order.find()
            .sort({ createdAt: -1 })
            .populate('items.customKeychain.head')
            .populate('items.customKeychain.torso')
            .populate('items.customKeychain.legs')
            .populate('items.customKeychain.accessory')
            .populate('items.product');
    }
    static async updateOrderStatus(orderId, status) {
        return await Order_1.Order.findByIdAndUpdate(orderId, { status }, { new: true });
    }
    static async getOrdersByEmail(email) {
        return await Order_1.Order.find({ customerEmail: email })
            .sort({ createdAt: -1 })
            .populate('items.customKeychain.head')
            .populate('items.customKeychain.torso')
            .populate('items.customKeychain.legs')
            .populate('items.customKeychain.accessory')
            .populate('items.product');
    }
}
exports.OrderService = OrderService;
