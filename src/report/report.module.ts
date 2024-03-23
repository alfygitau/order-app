import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { ManualOrder } from 'src/entities/ManualOrder';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Order, ManualOrder, User])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
