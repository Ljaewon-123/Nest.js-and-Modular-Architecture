import { Injectable, Logger } from '@nestjs/common';
import { PublicPaymentService } from '../public-service/public-payment.service';
import { Order } from 'src/context-orders/types/order.type';

@Injectable()
export class PaymentFacade {
  private readonly logger = new Logger(PaymentFacade.name);
  
  constructor(private publicPaymentService: PublicPaymentService) {}
  
  /**
   * 주문에 대한 결제 프로세스 전체를 처리하는 메서드
   * @param order 주문 정보 DTO를 넣어서 하라는거 같은데 이런거에
   * @returns 결제 처리 결과
   */
  async processOrderPayment(order: Order): Promise<OrderPaymentResult> {
    this.logger.log(`Processing payment for order #${order.id}`);
    
    try {
      // 1. 주문 금액 계산 (단가 * 수량)
      const unitPrice = this.publicPaymentService.getProductPrice(order.product);
      const totalAmount = unitPrice * order.quantity;
      
      // 2. 결제 처리
      this.logger.log(`Processing payment of ${totalAmount} for order #${order.id}`);
      const payment = await this.publicPaymentService.processPayment(totalAmount);
      
      // 3. 청구 정보 생성
      this.logger.log(`Creating billing record for payment #${payment.id}`);
      const billing = await this.publicPaymentService.createBillingRecord(
        payment.id,
        totalAmount
      );
      
      // 4. 성공 응답 반환
      return {
        success: true,
        orderId: order.id,
        paymentId: payment.id,
        billingId: billing.id
      };
    } catch (error) {
      // 오류 처리 및 로깅
      this.logger.error(`Payment processing failed for order #${order.id}: ${error.message}`);
      
      return {
        success: false,
        orderId: order.id,
        error: error.message
      };
    }
  }
  
  /**
   * 결제 정보 조회 - Public Service의 메서드를 그대로 노출
   * @param paymentId 결제 ID
   * @returns 결제 및 청구 상세 정보
   */
  async getPaymentDetails(paymentId: number) {
    return this.publicPaymentService.getPaymentDetails(paymentId);
  }
}