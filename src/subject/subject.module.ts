import { Module } from '@nestjs/common';
import { SubjectController } from './controllers/subject/subject.controller';
import { SubjectService } from './services/subject/subject.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subject } from 'src/entities/Subject';

@Module({
  imports: [TypeOrmModule.forFeature([Subject])],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
