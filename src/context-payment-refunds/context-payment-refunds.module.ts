import { Module } from '@nestjs/common';
import { ContextPaymentRefundsController } from './api/context-payment-refunds.controller';
import { ContextPaymentRefundsService } from './api/context-payment-refunds.service';

@Module({
  controllers: [ContextPaymentRefundsController],
  providers: [ContextPaymentRefundsService]
})
export class ContextPaymentRefundsModule {}
