import { Module } from '@nestjs/common';
import { StylesController } from './controllers/styles/styles.controller';
import { StylesService } from './services/styles/styles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Style } from 'src/entities/Style';

@Module({
  imports: [TypeOrmModule.forFeature([Style])],
  controllers: [StylesController],
  providers: [StylesService],
})
export class StylesModule {}
