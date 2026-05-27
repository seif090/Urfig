import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { uploadLegoPart } from '../middleware/uploadMiddleware';

const router = Router();

// In a real app, you'd add an admin check middleware here
router.post('/lego-parts', uploadLegoPart.single('image'), AdminController.addLegoPart);
router.get('/stats', AdminController.getPartStats);

// Product Management
router.post('/products', uploadLegoPart.single('image'), AdminController.createProduct);
router.put('/products/:id', uploadLegoPart.single('image'), AdminController.updateProduct);
router.delete('/products/:id', AdminController.deleteProduct);
router.get('/products/low-stock', AdminController.getLowStockProducts);

export default router;

