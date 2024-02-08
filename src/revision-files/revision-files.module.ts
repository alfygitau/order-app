import { Module } from '@nestjs/common';
import { RevisionFilesController } from './controllers/revision-files/revision-files.controller';
import { RevisionFilesService } from './services/revision-files/revision-files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevisionFile } from 'src/entities/Revision-files';
import { OrderService } from 'src/order/services/order/order.service';
import { Order } from 'src/entities/Order';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { OrderFile } from 'src/entities/Order-files';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([RevisionFile, Order, OrderFile]),
  ],
  controllers: [RevisionFilesController],
  providers: [RevisionFilesService, OrderService, AwsService],
  exports: [RevisionFilesService],
})
export class RevisionFilesModule {}
