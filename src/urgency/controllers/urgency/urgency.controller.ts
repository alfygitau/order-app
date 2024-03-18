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
import { CreateOrderDeadline } from 'src/urgency/dtos/CreateOrderDeadline.dto';
import { UrgencyService } from 'src/urgency/services/urgency/urgency.service';

@Controller('order-urgency')
export class UrgencyController {
  constructor(private readonly urgencyService: UrgencyService) {}

  @Get()
  getAllDeadlines(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage: number = 10,
  ) {
    return this.urgencyService.findAllDeadlines(page, itemsPerPage);
  }

  @Post('create')
  createOrderDeadline(@Body() orderDealinePayload: CreateOrderDeadline) {
    return this.urgencyService.createDeadline(orderDealinePayload);
  }

  @Patch(':id')
  updateOrderUrgency(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePayload: CreateOrderDeadline,
  ) {
    return this.urgencyService.updateOrderDeadline(id, updatePayload);
  }

  @Delete(':id')
  deleteOrderUrgency(@Param('id') id: number) {
    return this.urgencyService.deleteOrderUrgency(id);
  }
}
