import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
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
  getAllOrders(
    @Query('userId') userId?: number,
    @Query('status') status?: string,
  ) {
    return this.orderService.getAllOrders(userId, status);
  }

  @Post(':orderId/upload-files')
  @UseInterceptors(FilesInterceptor('files'))
  uploadOrderFiles(
    @Param('orderId', ParseIntPipe) orderId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
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

  @Patch(':orderId/assign')
  assignOrder(@Param('orderId') orderId: number) {
    return this.orderService.assignOrder(orderId);
  }

  @Patch(':orderId/re-assign')
  reAssignOrder(@Param('orderId') orderId: number) {
    return this.orderService.reAssignOrder(orderId);
  }

  @Patch(':orderId/cancel-order')
  cancelOrder(@Param('orderId') orderId: number) {
    return this.orderService.cancelOrder(orderId);
  }

  @Patch(':orderId/submit-order')
  @UseInterceptors(FilesInterceptor('files'))
  completeOrder(
    @Param('orderId') orderId: number,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.orderService.submitOrder(orderId, files);
  }
}
