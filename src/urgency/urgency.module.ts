import { Module } from '@nestjs/common';
import { UrgencyController } from './controllers/urgency/urgency.controller';
import { UrgencyService } from './services/urgency/urgency.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Urgency } from 'src/entities/Urgency';

@Module({
  imports: [TypeOrmModule.forFeature([Urgency])],
  controllers: [UrgencyController],
  providers: [UrgencyService],
})
export class UrgencyModule {}
