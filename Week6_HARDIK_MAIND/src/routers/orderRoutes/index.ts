import { Router } from 'express';
import OrderController from '../../controllers/orderController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.get('/orders/:id', authMiddleware, OrderController.getOrderById);

export default router;
