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
import { ManualOrderService } from './manual-order.service';
import { CreateManualOrder } from './dto/CreateManualOrder.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('manual-order')
export class ManualOrderController {
  constructor(private readonly manualOrderService: ManualOrderService) {}

  @Post('create')
  createManualOrder(@Body() manualOrderPayload: CreateManualOrder) {
    return this.manualOrderService.createManualOrder(manualOrderPayload);
  }

  @Post('upload-manual-files')
  @UseInterceptors(FilesInterceptor('manual_order_files'))
  uploadManualOrderFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.manualOrderService.uploadManualOrderFiles(files);
  }

  @Get('orders')
  getAllManualOrders(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.manualOrderService.getAllManualOrders(page, itemsPerPage);
  }

  @Get(':id')
  getManualOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.manualOrderService.getManualOrderById(id);
  }

  @Delete(':id')
  removeManualOrder(@Param('id', ParseIntPipe) id: number) {
    return this.manualOrderService.deleteManualOrder(id);
  }

  @Patch(':id')
  updateManualOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateManualOrder,
  ) {
    return this.manualOrderService.updateManualOrder(id, payload);
  }
}
