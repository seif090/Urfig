"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("../controllers/OrderController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/orders/checkout
 * @desc    Process a checkout and create an order
 */
router.post('/checkout', OrderController_1.OrderController.checkout);
/**
 * @route   GET /api/orders/my-orders
 * @desc    Get order history for a specific customer
 */
router.get('/my-orders', OrderController_1.OrderController.getMyOrders);
/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin)
 */
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, OrderController_1.OrderController.listOrders);
/**
 * @route   GET /api/orders/:id
 * @desc    Get full details of a specific order
 */
router.get('/:id', OrderController_1.OrderController.getOrderDetails);
/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status (Admin)
 */
router.patch('/:id/status', OrderController_1.OrderController.updateStatus);
exports.default = router;
