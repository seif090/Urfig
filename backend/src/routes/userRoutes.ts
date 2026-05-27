import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();

router.post('/saved-designs', authenticate, UserController.saveDesign);
router.get('/saved-designs', authenticate, UserController.getSavedDesigns);
router.post('/wishlist', authenticate, UserController.toggleWishlist);
router.get('/wishlist', authenticate, UserController.getWishlist);

export default router;

