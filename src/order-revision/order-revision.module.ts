import { Module } from '@nestjs/common';
import { OrderRevisionController } from './controllers/order-revision/order-revision.controller';
import { OrderRevisionService } from './services/order-revision/order-revision.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRevision } from 'src/entities/Order-revision';
import { UsersService } from 'src/users/services/users/users.service';
import { User } from 'src/entities/User';
import { Order } from 'src/entities/Order';
import { OrderService } from 'src/order/services/order/order.service';
import { OrderFile } from 'src/entities/Order-files';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderRevision, User, OrderFile])],
  controllers: [OrderRevisionController],
  providers: [
    OrderRevisionService,
    UsersService,
    OrderService,
    AwsService,
    ConfigService,
  ],
})
export class OrderRevisionModule {}
