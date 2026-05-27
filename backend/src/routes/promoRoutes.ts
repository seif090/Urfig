import { Router } from 'express';
import { PromoController } from '../controllers/PromoController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/validate', PromoController.validateCode);
router.post('/create', authenticate, isAdmin, PromoController.createPromo);

export default router;
