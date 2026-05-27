"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const Review_1 = require("../models/Review");
class ReviewController {
    static async addReview(req, res) {
        try {
            const { productId, rating, comment } = req.body;
            const userId = req.user?.id;
            const userName = req.user?.name || 'Customer'; // Assuming name is in token or fetch from DB
            if (!userId)
                return res.status(401).json({ message: 'Login required' });
            const review = new Review_1.Review({
                product: productId,
                user: userId,
                userName,
                rating: parseInt(rating),
                comment
            });
            await review.save();
            res.status(201).json(review);
        }
        catch (error) {
            res.status(500).json({ message: 'Error adding review', error: error.message });
        }
    }
    static async getProductReviews(req, res) {
        try {
            const { productId } = req.params;
            const reviews = await Review_1.Review.find({ product: productId }).sort({ createdAt: -1 });
            res.json(reviews);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching reviews', error: error.message });
        }
    }
}
exports.ReviewController = ReviewController;
