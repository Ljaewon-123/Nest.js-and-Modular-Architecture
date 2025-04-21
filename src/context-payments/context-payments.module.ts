import { Module } from '@nestjs/common';
import { PaymentsController } from './api/payments.controller';
import { PaymentsService } from './services/payments.service';
import { PaymentFacde } from './facades/payment.facade';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentFacde],
  exports: [PaymentsService, PaymentFacde],
})
export class ContextPaymentsModule {}
