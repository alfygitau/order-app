import { Module } from '@nestjs/common';
import { PagesController } from './controllers/pages/pages.controller';
import { PagesService } from './services/pages/pages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pages } from 'src/entities/Pages';

@Module({
  imports: [TypeOrmModule.forFeature([Pages])],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
