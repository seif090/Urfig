"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderItemSchema = new mongoose_1.Schema({
    product: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    customKeychain: {
        head: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
        torso: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
        legs: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
        accessory: { type: mongoose_1.Schema.Types.ObjectId, ref: 'LegoPart' },
        customText: { type: String },
        price: { type: Number }
    },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true }
}, { _id: false });
const OrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    items: [OrderItemSchema],
    paymentMethod: { type: String, enum: ['vodafone_cash', 'instapay', 'cod'], required: true },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    discountAmount: { type: Number, default: 0 },
    promoCode: { type: String },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', OrderSchema);
