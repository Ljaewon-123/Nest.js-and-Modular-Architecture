import { BadRequestException, Injectable } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

@Injectable()
export class PublicPaymentService {
  constructor(private paymentsService: PaymentsService) {}
  
  /**
   * 결제 처리를 위한 메서드
   * @param amount 결제 금액
   * @returns 처리된 결제 정보
   */
  async processPayment(amount: number): Promise<Payment> {
    // 기본적인 검증 로직
    if (amount <= 0) {
      throw new BadRequestException('Payment amount must be greater than 0');
    }
    
    return this.paymentsService.processPayment(amount);
  }
  
  /**
   * 청구 정보 생성 메서드
   * @param paymentId 결제 ID
   * @param amount 청구 금액
   * @returns 생성된 청구 정보
   */
  async createBillingRecord(paymentId: number, amount: number): Promise<BillingInfo> {
    // 검증 로직
    if (!paymentId) {
      throw new BadRequestException('Payment ID is required');
    }
    
    if (amount <= 0) {
      throw new BadRequestException('Billing amount must be greater than 0');
    }
    
    // 결제 정보가 존재하는지 확인
    const payment = await this.paymentsService.getPaymentById(paymentId);
    if (!payment) {
      throw new BadRequestException(`Payment with ID ${paymentId} not found`);
    }
    
    return this.paymentsService.createBillingInfo({
      paymentId,
      amount
    });
  }
  
  /**
   * 제품 가격 조회 메서드
   * @param productName 제품명
   * @returns 제품 단가
   */
  getProductPrice(productName: string): number {
    if (!productName || productName.trim() === '') {
      throw new BadRequestException('Product name is required');
    }
    
    return this.paymentsService.getProductPrice(productName);
  }
  
  /**
   * 결제 정보 조회 메서드
   * @param paymentId 결제 ID
   * @returns 결제 정보
   */
  async getPaymentDetails(paymentId: number): Promise<{
    payment: Payment;
    billing?: BillingInfo;
  }> {
    const payment = await this.paymentsService.getPaymentById(paymentId);
    if (!payment) {
      throw new BadRequestException(`Payment with ID ${paymentId} not found`);
    }
    
    const billing = await this.paymentsService.getBillingByPaymentId(paymentId);
    
    return {
      payment,
      billing
    };
  }
}