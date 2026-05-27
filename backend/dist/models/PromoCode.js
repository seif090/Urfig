"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCode = void 0;
const mongoose_1 = require("mongoose");
const PromoCodeSchema = new mongoose_1.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    expiryDate: { type: Date, required: true },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.PromoCode = (0, mongoose_1.model)('PromoCode', PromoCodeSchema);
