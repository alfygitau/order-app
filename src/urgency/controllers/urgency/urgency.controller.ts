import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
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
}
