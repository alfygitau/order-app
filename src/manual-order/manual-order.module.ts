import { Module } from '@nestjs/common';
import { ManualOrderService } from './manual-order.service';
import { ManualOrderController } from './manual-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManualOrder } from 'src/entities/ManualOrder';
import { ManualOrderFile } from 'src/entities/Manual_order_files';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([ManualOrder, ManualOrderFile])],
  providers: [ManualOrderService, AwsService, ConfigService],
  controllers: [ManualOrderController],
})
export class ManualOrderModule {}
