import {
  Body,
  Controller,
  Get,
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
}
