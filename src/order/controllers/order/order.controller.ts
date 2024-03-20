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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateOrder } from 'src/order/dtos/CreateOrder.dto';
import { CreateOrderMessage } from 'src/order/dtos/CreateOrderMessage.dto';
import { UpdateOrder } from 'src/order/dtos/UpdateOrder.dto';
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
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.orderService.getAllOrders(userId, status, page, itemsPerPage);
  }

  @Get('/cancelled-orders')
  getCancelledOrders() {
    return this.orderService.getCancelledOrders();
  }

  @Get('/completed-orders')
  getCompletedOrders() {
    return this.orderService.getCompletedOrders();
  }

  @Get('/assigned-orders')
  getAssignedOrders() {
    return this.orderService.getAssignedOrders();
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

  @Post(':orderId/order-message')
  createOrderMessage(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: CreateOrderMessage,
  ) {
    return this.orderService.createOrderMessage(orderId, payload);
  }

  @Get(':orderId/order-messages')
  getOrderMessages(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.getOrderMessages(orderId);
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

  @Patch(':orderId/update-order')
  updateOrder(@Param('orderId') orderId: number, @Body() payload: UpdateOrder) {
    return this.orderService.updateOrder(orderId, payload);
  }

  @Delete(':fileId/remove-order-file')
  removeOrderFile(@Param('fileId', ParseIntPipe) fileId: number) {
    return this.orderService.removeOrderFile(fileId);
  }
}
