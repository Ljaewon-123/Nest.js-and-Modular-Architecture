import { Injectable } from '@nestjs/common';
import { PublicOrderService } from '../public-services/public-order.service';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { Order } from '../types/order.type';

@Injectable()
export class OrderFacade {
  constructor(private publicOrderService: PublicOrderService) {}

  // 주문 생성 및 관련된 다른 작업을 한 번에 처리
  processOrder(createOrderDto: CreateOrderDto) {
    const { product, quantity } = createOrderDto;
    
    // 1. 주문 생성
    const order = this.publicOrderService.createOrder(product, quantity);
    
    // 2. 여기서 추가적인 작업을 할 수 있음 (예: 알림 보내기, 재고 업데이트 등)
    const notificationSent = this.sendOrderNotification(order);
    
    // 3. 결과 반환
    return {
      message: 'Order processed successfully!',
      order,
      notification: notificationSent ? 'Sent' : 'Failed'
    };
  }

  // 모든 주문 조회 기능
  getOrderSummary() {
    const orders = this.publicOrderService.getAllOrders();
    const totalOrders = orders.length;
    const totalQuantity = orders.reduce((sum, order) => sum + order.quantity, 0);
    
    return {
      orders,
      summary: {
        totalOrders,
        totalQuantity
      }
    };
  }

  // 알림 보내기 (가상의 기능)
  private sendOrderNotification(order: Order): boolean {
    // 실제로는 여기서 알림 서비스 호출 등의 작업을 수행
    console.log(`Notification sent for order #${order.id}`);
    return true;
  }
}
