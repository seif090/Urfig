"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CustomizerController_1 = require("../controllers/CustomizerController");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/customizer/parts
 * @desc    Get all available lego parts for customization
 */
router.get('/parts', CustomizerController_1.CustomizerController.getAvailableParts);
/**
 * @route   POST /api/customizer/calculate-price
 * @desc    Calculate price for a specific configuration of parts
 */
router.post('/calculate-price', CustomizerController_1.CustomizerController.getPrice);
exports.default = router;
