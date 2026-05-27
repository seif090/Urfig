import { Router } from 'express';
import { AdminController } from '../controllers/AdminController.js';
import { uploadLegoPart } from '../middleware/uploadMiddleware.js';

const router = Router();

// In a real app, you'd add an admin check middleware here
router.post('/lego-parts', uploadLegoPart.single('image'), AdminController.addLegoPart);
router.get('/stats', AdminController.getPartStats);

// Product Management
router.post('/products', uploadLegoPart.single('image'), AdminController.createProduct);
router.put('/products/:id', uploadLegoPart.single('image'), AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);

export default router;
迫