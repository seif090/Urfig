"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductController_1 = require("../controllers/ProductController");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/products
 * @desc    Get all ready-made products with filters
 */
router.get('/', ProductController_1.ProductController.listProducts);
/**
 * @route   GET /api/products/categories
 * @desc    Get all unique product categories
 */
router.get('/categories', ProductController_1.ProductController.getCategories);
exports.default = router;
