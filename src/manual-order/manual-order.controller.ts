import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ManualOrderService } from './manual-order.service';
import { CreateManualOrder } from './dto/CreateManualOrder.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('manual-order')
export class ManualOrderController {
  constructor(private readonly manualOrderService: ManualOrderService) {}

  @Post("create")
  @UseInterceptors(FilesInterceptor('manual_order_files'))
  createManualOrder(
    @Body() manualOrderPayload: CreateManualOrder,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    console.log(manualOrderPayload)
    return this.manualOrderService.createManualOrder(manualOrderPayload, files);
  }
}