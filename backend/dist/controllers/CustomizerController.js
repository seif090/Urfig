"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizerController = void 0;
const CustomizerService_1 = require("../services/CustomizerService");
class CustomizerController {
    static async getAvailableParts(req, res) {
        try {
            const groupedParts = await CustomizerService_1.CustomizerService.getAllPartsGrouped();
            res.status(200).json(groupedParts);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching lego parts', error });
        }
    }
    static async getPrice(req, res) {
        try {
            const { partIds } = req.body;
            if (!Array.isArray(partIds)) {
                return res.status(400).json({ message: 'partIds must be an array' });
            }
            const totalPrice = await CustomizerService_1.CustomizerService.calculateConfigurationPrice(partIds);
            res.status(200).json({ totalPrice });
        }
        catch (error) {
            res.status(500).json({ message: 'Error calculating price', error });
        }
    }
}
exports.CustomizerController = CustomizerController;
