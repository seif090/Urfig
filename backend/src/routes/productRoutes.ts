import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Get all ready-made products with filters
 */
router.get('/', ProductController.listProducts);

/**
 * @route   GET /api/products/categories
 * @desc    Get all unique product categories
 */
router.get('/categories', ProductController.getCategories);

export default router;
迫