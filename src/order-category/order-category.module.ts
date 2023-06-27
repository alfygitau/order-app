import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderCategory } from 'src/entities/Order-category';
import { OrderCategoryController } from './controllers/order-category/order-category.controller';
import { OrderCategoryService } from './services/order-category/order-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderCategory])],
  controllers: [OrderCategoryController],
  providers: [OrderCategoryService],
})
export class OrderCategoryModule {}
