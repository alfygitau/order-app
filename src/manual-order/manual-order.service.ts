import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ManualOrder } from 'src/entities/ManualOrder';
import { ManualOrderFile } from 'src/entities/Manual_order_files';
import { Repository } from 'typeorm';
import { CreateManualOrder } from './dto/CreateManualOrder.dto';
import { AwsService } from 'src/order-files/services/aws/aws.service';

@Injectable()
export class ManualOrderService {
  constructor(
    @InjectRepository(ManualOrder)
    private readonly manualOrderRepository: Repository<ManualOrder>,
    private readonly awsService: AwsService,

    @InjectRepository(ManualOrderFile)
    private readonly manualOrderFileRepository: Repository<ManualOrderFile>,
  ) {}
  async createManualOrder(
    manualOrderPayload: CreateManualOrder,
    files: Express.Multer.File[],
  ) {
    const manualOrder = this.manualOrderRepository.create(manualOrderPayload);
    const savedManualOrder = await this.manualOrderRepository.save(manualOrder);
    const uploadedFileUrls = await this.awsService.uploadOrderFiles(files);

    const createdManualOrderFiles: ManualOrderFile[] = [];
    
    for (const url of uploadedFileUrls) {
      const manualOrderFile = new ManualOrderFile();
      manualOrderFile.manualfileUrl = url;
      manualOrderFile.order = savedManualOrder;
      const savedManualOrderFile = await this.manualOrderFileRepository.save(
        manualOrderFile,
      );
      createdManualOrderFiles.push(savedManualOrderFile);
    }
    savedManualOrder.manual_order_files = createdManualOrderFiles;
    await this.manualOrderRepository.save(savedManualOrder);
    return { order: savedManualOrder };
  }

  getAllManualOrders() {}

  updateManualOrder() {}

  deleteManualOrder() {}
}
