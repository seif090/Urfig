import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/:productId', ReviewController.getProductReviews);
router.post('/', authenticate, ReviewController.addReview);

export default router;
迫