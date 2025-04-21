import { Module } from '@nestjs/common';
import { OrdersController } from './api/orders.controller';
import { OrdersService } from './services/orders.service';
import { PublicOrderService } from './public-services/public-order.service';
import { OrderFacade } from './facades/order.facade';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PublicOrderService, OrderFacade],
  exports: [PublicOrderService, OrderFacade] 
})
export class ContextOrdersModule {}
