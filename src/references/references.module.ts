import { Module } from '@nestjs/common';
import { ReferencesController } from './controllers/references/references.controller';
import { ReferencesService } from './services/references/references.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reference } from 'src/entities/References';

@Module({
  imports: [TypeOrmModule.forFeature([Reference])],
  controllers: [ReferencesController],
  providers: [ReferencesService],
})
export class ReferencesModule {}
