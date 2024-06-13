import { Router } from 'express';
import PaymentController from '../../controllers/paymentController';
import authMiddleware from '../../middleware/authMiddleware';

const router = Router();

router.post('/orders', authMiddleware, PaymentController.createPayment);

export default router;
