import { Router } from 'express';
import { PromoController } from '../controllers/PromoController';
import { authenticate, isAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/validate', PromoController.validateCode);
router.post('/create', authenticate, isAdmin, PromoController.createPromo);

export default router;

