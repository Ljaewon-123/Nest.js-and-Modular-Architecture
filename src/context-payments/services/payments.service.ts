import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {

  private currentPayment: Payment[] = []
  private billingInfo: BillingInfo[] = []

  async processPayment(amount: number) {
    // 결제 처리 로직을 여기에 구현합니다.
    const payment: Payment = {
      id: this.currentPayment.length + 1,
      amount: amount,
      status: 'processed',
    };
    this.currentPayment.push(payment);
    return payment;
  }

  async createBillingInfo({
    paymentId,
    amount,
  }: {
    paymentId: number;
    amount: number;
  }) {
    const billing: BillingInfo = {
      id: this.billingInfo.length + 1,
      paymentId : paymentId,
      amount: amount,
    };
    this.billingInfo.push(billing);
    return billing;
  }

   // 추가된 메서드 - 주문 총액 계산을 위한 단가 조회
  getProductPrice(productName: string): number {
    const priceMap = {
      'Product A': 100,
      'Product B': 200,
      'Product C': 150,
      'default': 100
    };
    
    return priceMap[productName] || priceMap['default'];
  }
  
  // 결제 상태 조회 메서드
  async getPaymentById(id: number): Promise<Payment | undefined> {
    return this.currentPayment.find(payment => payment.id === id);
  }
  
  // 청구 정보 조회 메서드
  async getBillingByPaymentId(paymentId: number): Promise<BillingInfo | undefined> {
    return this.billingInfo.find(billing => billing.paymentId === paymentId);
  }
}
