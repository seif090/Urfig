"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoController = void 0;
const PromoCode_1 = require("../models/PromoCode");
class PromoController {
    static async validateCode(req, res) {
        try {
            const { code } = req.body;
            const promo = await PromoCode_1.PromoCode.findOne({ code: code.toUpperCase(), isActive: true });
            if (!promo) {
                return res.status(404).json({ message: 'Invalid or expired promo code' });
            }
            const now = new Date();
            if (promo.expiryDate < now) {
                return res.status(400).json({ message: 'Promo code has expired' });
            }
            if (promo.usageLimit && promo.usageCount >= promo.usageLimit) {
                return res.status(400).json({ message: 'Promo code usage limit reached' });
            }
            res.status(200).json({
                code: promo.code,
                discountType: promo.discountType,
                discountValue: promo.discountValue
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Error validating promo code', error: error.message });
        }
    }
    // Admin only: create a promo code
    static async createPromo(req, res) {
        try {
            const promo = new PromoCode_1.PromoCode(req.body);
            await promo.save();
            res.status(201).json(promo);
        }
        catch (error) {
            res.status(500).json({ message: 'Error creating promo code', error: error.message });
        }
    }
}
exports.PromoController = PromoController;
