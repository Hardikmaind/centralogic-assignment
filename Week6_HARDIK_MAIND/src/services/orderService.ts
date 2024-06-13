import Order from '../models/order';

class OrderService {
  async createOrder(orderData: { userId: string, bookId: string, amount: number, status: string }) {
    return Order.create(orderData);
  }

  async getOrderById(orderId: string) {
    return Order.findByPk(orderId);
  }
}

export default new OrderService();
