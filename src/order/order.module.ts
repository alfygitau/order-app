import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order/order.controller';
import { OrderService } from './services/order/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { ConfigModule } from '@nestjs/config';
import { OrderFile } from 'src/entities/Order-files';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { CompletedOrderFile } from 'src/entities/Completed-order-files';
import { User } from 'src/entities/User';
import { OrderMessage } from 'src/entities/Order-message';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      Order,
      OrderFile,
      CompletedOrderFile,
      User,
      OrderMessage,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService, AwsService],
  exports: [OrderService],
})
export class OrderModule {}
