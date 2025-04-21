import { Controller, Get, Post } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';

// I think 여기는 이거 쓸일 없을거 같은데
@Controller('context-payments')
export class PaymentsController {

  constructor(
    private readonly paymentsService: PaymentsService
  ) {}

  @Post('process-payment')
  async processPayment() {
    
    try {
      const payment = await this.paymentsService.processPayment();
      payment.status = 'success';
      
      return {
        message: 'Payment processed successfully!',
        payment,
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      return {
        message: 'Failed to process payment.',
        error: error.message,
      }; 
    }
  }

  @Get('get-billing')
  getBilling() {
    // 청구 정보 조회 로직을 여기에 구현합니다.
    return {
      message: 'Billing information retrieved successfully!',
    };
  }
}
