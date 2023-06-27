import { Module } from '@nestjs/common';
import { OrderMessageService } from './services/order-message/order-message.service';
import { OrderMessageController } from './controllers/order-message/order-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderMessage } from 'src/entities/Order-message';

@Module({
  imports: [TypeOrmModule.forFeature([OrderMessage])],
  providers: [OrderMessageService],
  controllers: [OrderMessageController],
})
export class OrderMessageModule {}
