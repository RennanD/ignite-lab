import { Module } from '@nestjs/common';
import { PurchasesController } from './controller/purchases.controller';

@Module({
  controllers: [PurchasesController],
})
export class MessagingModule {}
