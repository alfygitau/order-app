import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateOrder } from 'src/order/dtos/CreateOrder.dto';
import { OrderService } from 'src/order/services/order/order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create')
  createNewOrder(@Body() orderPayload: CreateOrder) {
    return this.orderService.createOrder(orderPayload);
  }

  @Get()
  getAllOrders(@Query('userId') userId?: number) {
    console.log('log');
    return this.orderService.getAllOrders(userId);
  }

  @Post(':orderId/upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadOrderFiles(
    @Param('orderId', ParseIntPipe) orderId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(orderId);
    return this.orderService.addOrderFiles(orderId, files);
  }

  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number) {
    return this.orderService.getOrderById(orderId);
  }

  @Get(':orderId/order-files')
  getOrderFiles(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderFiles(orderId);
  }

  @Get(':orderId/revisions')
  getOrderRevisions(@Param('orderId') orderId: number) {
    return this.orderService.getOrderRevisions(orderId);
  }
}
