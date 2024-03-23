import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManualOrder } from 'src/entities/ManualOrder';
import { Repository } from 'typeorm';
import { CreateManualOrder } from './dto/CreateManualOrder.dto';
import { AwsService } from 'src/order-files/services/aws/aws.service';

@Injectable()
export class ManualOrderService {
  constructor(
    @InjectRepository(ManualOrder)
    private readonly manualOrderRepository: Repository<ManualOrder>,
    private readonly awsService: AwsService,
  ) {}
  async createManualOrder(manualOrderPayload: CreateManualOrder) {
    const { manual_order_title, manual_order_comments, manual_order_files } =
      manualOrderPayload;

    const manualOrder = new ManualOrder();
    manualOrder.manual_order_title = manual_order_title;
    manualOrder.manual_order_comments = manual_order_comments;
    manualOrder.manual_order_files = manual_order_files;

    return await this.manualOrderRepository.save(manualOrder);
  }

  getAllManualOrders() {}

  updateManualOrder() {}

  deleteManualOrder() {}

  async uploadManualOrderFiles(files: Express.Multer.File[]) {
    const UploadedFiles = await this.awsService.uploadOrderFiles(files);

    return { files: UploadedFiles };
  }
}
