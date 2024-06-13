import { Request, Response } from 'express';
import PaymentService from '../services/paymentService';

class PaymentController {
  async createPayment(req: Request, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const paymentData = {
        ...req.body,
        userId: req.body.user.id,
        bookId: req.params.bookId
      };
      const payment = await PaymentService.processPayment(paymentData);
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new PaymentController();
