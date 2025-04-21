import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { PaymentFacade } from 'src/context-payments/facades/payment.facade';
import { OrdersService } from '../services/orders.service';

@Controller('context-orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentFacade: PaymentFacade
  ) {}

  @Post('create-order')
  async createOrder(@Body() body: CreateOrderDto) {
    // 1. 주문 생성
    const order = this.ordersService.createOrder(body);
    
    // 2. 주문에 대한 결제 처리 (Payment Facade 사용)
    const paymentResult = await this.paymentFacade.processOrderPayment(order);
    
    // 3. 결제가 성공하면 주문의 최종 금액 업데이트
    if (paymentResult.success) {
      // 결제 상세 조회
      const paymentDetails = await this.paymentFacade.getPaymentDetails(paymentResult.paymentId);
      
      // 주문 금액 업데이트
      this.ordersService.updateOrderTotalAmount(order.id, paymentDetails.payment.amount);
    }
    
    // 4. 응답 반환
    return {
      message: paymentResult.success 
        ? 'Order created and payment processed successfully!' 
        : 'Order created but payment failed',
      order: this.ordersService.getAllOrders().find(o => o.id === order.id),
      payment: paymentResult
    };
  }

  @Get('get-orders')
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }
  
  @Get('order/:id/payment')
  async getOrderPayment(@Param('id') orderId: number) {
    const order = this.ordersService.getAllOrders().find(o => o.id === +orderId);
    
    if (!order) {
      return { message: 'Order not found' };
    }
    
    return {
      order,
      payment: (order.totalAmount ?? 0) > 0 
        ? await this.paymentFacade.getPaymentDetails(order.id) 
        : null
    };
  }
}