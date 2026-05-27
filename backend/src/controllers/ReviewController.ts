import { Response } from 'express';
import { Review } from '../models/Review';
import { AuthRequest } from '../middleware/authMiddleware';

export class ReviewController {
  static async addReview(req: AuthRequest, res: Response) {
    try {
      const { productId, rating, comment } = req.body;
      const userId = req.user?.id;
      const userName = (req as any).user?.name || 'Customer'; // Assuming name is in token or fetch from DB

      if (!userId) return res.status(401).json({ message: 'Login required' });

      const review = new Review({
        product: productId,
        user: userId,
        userName,
        rating: parseInt(rating),
        comment
      });

      await review.save();
      res.status(201).json(review);
    } catch (error: any) {
      res.status(500).json({ message: 'Error adding review', error: error.message });
    }
  }

  static async getProductReviews(req: any, res: Response) {
    try {
      const { productId } = req.params;
      const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
      res.json(reviews);
    } catch (error: any) {
      res.status(500).json({ message: 'Error fetching reviews', error: error.message });
    }
  }
}

