"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReviewController_1 = require("../controllers/ReviewController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/:productId', ReviewController_1.ReviewController.getProductReviews);
router.post('/', authMiddleware_1.authenticate, ReviewController_1.ReviewController.addReview);
exports.default = router;
