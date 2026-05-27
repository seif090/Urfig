import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.get('/:productId', ReviewController.getProductReviews);
router.post('/', authenticate, ReviewController.addReview);

export default router;

