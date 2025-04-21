import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../types/order.type';

@Injectable()
export class OrdersService {
  private orders: Order[] = [];

  createOrder(dto: CreateOrderDto): Order {
    const newOrder: Order = {
      id: this.orders.length + 1,
      product: dto.product,
      quantity: dto.quantity,
      createdAt: new Date(),
      totalAmount: 0 // 초기값, 나중에 계산됨
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  getAllOrders(): Order[] {
    return this.orders;
  }
  
  updateOrderTotalAmount(orderId: number, amount: number): Order {
    const order = this.orders.find(o => o.id === orderId);

    if (!order) {
      throw new Error(`Order with ID ${orderId} not found`);
    }
    
    order.totalAmount = amount;
    return order;
  }
}