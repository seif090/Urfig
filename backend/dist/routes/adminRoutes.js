"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController_1 = require("../controllers/AdminController");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = (0, express_1.Router)();
// In a real app, you'd add an admin check middleware here
router.post('/lego-parts', uploadMiddleware_1.uploadLegoPart.single('image'), AdminController_1.AdminController.addLegoPart);
router.get('/stats', AdminController_1.AdminController.getPartStats);
// Product Management
router.post('/products', uploadMiddleware_1.uploadLegoPart.single('image'), AdminController_1.AdminController.createProduct);
router.put('/products/:id', uploadMiddleware_1.uploadLegoPart.single('image'), AdminController_1.AdminController.updateProduct);
router.delete('/products/:id', AdminController_1.AdminController.deleteProduct);
router.get('/products/low-stock', AdminController_1.AdminController.getLowStockProducts);
exports.default = router;
