import { Module } from '@nestjs/common';
import { PaymentsController } from './api/payments.controller';
import { PaymentsService } from './services/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class ContextPaymentsModule {}
