import { Request, Response } from 'express';
import OrderService from '../services/orderService';

class OrderController {
  async getOrderById(req: Request, res: Response) {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

export default new OrderController();
