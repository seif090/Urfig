"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PromoController_1 = require("../controllers/PromoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.post('/validate', PromoController_1.PromoController.validateCode);
router.post('/create', authMiddleware_1.authenticate, authMiddleware_1.isAdmin, PromoController_1.PromoController.createPromo);
exports.default = router;
