import { Module } from '@nestjs/common';
import { OrderTypeController } from './controllers/order-type/order-type.controller';
import { OrderTypeService } from './services/order-type/order-type.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderType } from 'src/entities/Order-type';

@Module({
  imports: [TypeOrmModule.forFeature([OrderType])],
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
})
export class OrderTypeModule {}
