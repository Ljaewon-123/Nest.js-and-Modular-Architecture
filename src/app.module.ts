import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ContextOrdersModule } from './context-orders/context-orders.module';
import { ContextPaymentsModule } from './context-payments/context-payments.module';
import { ContextPaymentRefundsModule } from './context-payment-refunds/context-payment-refunds.module';

@Module({
  imports: [UserModule, ContextOrdersModule, ContextPaymentsModule, ContextPaymentRefundsModule],
  controllers: [],
})
export class AppModule {}
