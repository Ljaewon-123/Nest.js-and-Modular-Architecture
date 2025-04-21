import { Injectable } from "@nestjs/common";
import { OrdersService } from "../services/orders.service";
import { Order } from "../types/order.type";

@Injectable()
export class PublicOrderService {
  constructor(private orderService: OrdersService) {}

  createOrder(product: string, quantity: number): Order {
    // 여기서 추가적인 검증이나 비즈니스 로직을 처리할 수 있음
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    
    return this.orderService.createOrder({
      product,
      quantity,
      createdAt: new Date()
    });
  }

  getAllOrders(): Order[] {
    return this.orderService.getAllOrders();
  }
}