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
import { CreateOrderType } from 'src/order-type/dtos/CreateOrderType.dto';
import { OrderTypeService } from 'src/order-type/services/order-type/order-type.service';

@Controller('order-types')
export class OrderTypeController {
  constructor(private readonly orderTypeService: OrderTypeService) {}

  @Post('create')
  createOrderType(@Body() orderTypePayload: CreateOrderType) {
    return this.orderTypeService.createOrderType(orderTypePayload);
  }

  @Get()
  getAllOrderTypes(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.orderTypeService.getAllOrderTypes(page, itemsPerPage);
  }

  @Get(':orderTypeId')
  GetOrderTypeById(@Param('orderTypeId', ParseIntPipe) id: number) {
    return this.orderTypeService.getOrderTypeById(id);
  }

  @Patch(':orderTypeId')
  updateAnOrderType(
    @Param('orderTypeId') id: number,
    @Body() orderTypePayload: CreateOrderType,
  ) {
    return this.orderTypeService.updateOrderType(id, orderTypePayload);
  }

  @Delete(':orderTypeId')
  deleteOrderType(@Param('orderTypeId') id: number) {
    return this.orderTypeService.deleteOrderType(id);
  }
}
