import { Router } from 'express';
import { CustomizerController } from '../controllers/CustomizerController.js';

const router = Router();

/**
 * @route   GET /api/customizer/parts
 * @desc    Get all available lego parts for customization
 */
router.get('/parts', CustomizerController.getAvailableParts);

/**
 * @route   POST /api/customizer/calculate-price
 * @desc    Calculate price for a specific configuration of parts
 */
router.post('/calculate-price', CustomizerController.getPrice);

export default router;
迫