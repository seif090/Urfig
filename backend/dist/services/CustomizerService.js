"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizerService = void 0;
const LegoPart_1 = require("../models/LegoPart");
class CustomizerService {
    /**
     * BASE_PRICE covers the keychain ring, chain, and assembly labor.
     */
    static BASE_PRICE = 4.99;
    /**
     * Fetch all active parts grouped by their type (Head, Torso, etc.)
     */
    static async getAllPartsGrouped() {
        const parts = await LegoPart_1.LegoPart.find({ isActive: true, stock: { $gt: 0 } });
        return {
            heads: parts.filter(p => p.type === LegoPart_1.LegoPartType.HEAD),
            torsos: parts.filter(p => p.type === LegoPart_1.LegoPartType.TORSO),
            legs: parts.filter(p => p.type === LegoPart_1.LegoPartType.LEGS),
            accessories: parts.filter(p => p.type === LegoPart_1.LegoPartType.ACCESSORY)
        };
    }
    /**
     * Validates a configuration and calculates the total dynamic price.
     * This ensures the price is calculated server-side to prevent tampering.
     */
    static async calculateConfigurationPrice(partIds) {
        const parts = await LegoPart_1.LegoPart.find({ _id: { $in: partIds } });
        const partsTotal = parts.reduce((sum, part) => sum + part.price, 0);
        return parseFloat((this.BASE_PRICE + partsTotal).toFixed(2));
    }
    /**
     * Verify if a specific configuration is valid (has all required parts)
     */
    static async validateConfiguration(headId, torsoId, legsId) {
        const requiredParts = await LegoPart_1.LegoPart.find({
            _id: { $in: [headId, torsoId, legsId] },
            isActive: true,
            stock: { $gt: 0 }
        });
        // Check if we found all 3 required types
        const foundTypes = new Set(requiredParts.map(p => p.type));
        return foundTypes.has(LegoPart_1.LegoPartType.HEAD) &&
            foundTypes.has(LegoPart_1.LegoPartType.TORSO) &&
            foundTypes.has(LegoPart_1.LegoPartType.LEGS);
    }
}
exports.CustomizerService = CustomizerService;
