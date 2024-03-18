import {
  BadRequestException,
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
  async getAllDeadlines(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    // Ensure that both page and itemsPerPage are positive numbers
    if (page < 1 || itemsPerPage < 1) {
      throw new BadRequestException('Invalid page or itemsPerPage');
    }
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
