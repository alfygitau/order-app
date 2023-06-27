import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrderDeadline } from 'src/urgency/dtos/CreateOrderDeadline.dto';
import { UrgencyService } from 'src/urgency/services/urgency/urgency.service';

@Controller('order-urgency')
export class UrgencyController {
  constructor(private readonly urgencyService: UrgencyService) {}

  @Get()
  getAllDeadlines() {
    return this.urgencyService.findAllDeadlines();
  }

  @Post('create')
  createOrderDeadline(@Body() orderDealinePayload: CreateOrderDeadline) {
    return this.urgencyService.createDeadline(orderDealinePayload);
  }
}
