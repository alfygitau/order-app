import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderCategory } from 'src/order-category/dtos/CreateOrderCategory.dto';
import { OrderCategoryService } from 'src/order-category/services/order-category/order-category.service';

@Controller('order-category')
export class OrderCategoryController {
  constructor(private readonly orderCategoryService: OrderCategoryService) {}

  @Get()
  getAllOrderCategories(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.orderCategoryService.findAllOrderCategories(page, itemsPerPage);
  }

  @Post('create')
  createOrderCategory(@Body() orderCategoryPayload: CreateOrderCategory) {
    return this.orderCategoryService.createOrderCategory(orderCategoryPayload);
  }

  @Patch(':orderCategoryId')
  updateOrderCategory(
    @Param('orderCategoryId') id: number,
    @Body() orderCategoryPayload: CreateOrderCategory,
  ) {
    return this.orderCategoryService.updateOrderCategory(
      id,
      orderCategoryPayload,
    );
  }

  @Get(':orderCategoryId')
  getOrderCategoryById(@Param('orderCategoryId') id: number) {
    return this.orderCategoryService.findOrderCategoryById(id);
  }

  @Delete(':orderCategoryId')
  deleteOrderCategory(@Param('orderCategoryId') id: number) {
    return this.orderCategoryService.deleteOrderCategory(id);
  }
}
