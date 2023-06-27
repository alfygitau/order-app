import { Module } from '@nestjs/common';
import { AcademicLevelController } from './controllers/academic-level/academic-level.controller';
import { AcademicLevelService } from './services/academic-level/academic-level.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicLevel } from 'src/entities/Academic-level';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicLevel])],
  controllers: [AcademicLevelController],
  providers: [AcademicLevelService],
})
export class AcademicLevelModule {}
