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

  async getAllManualOrders(page: number, itemsPerPage: number) {
    if (!page || !itemsPerPage) {
      return await this.manualOrderRepository.find();
    }
    const skip = (page - 1) * itemsPerPage;

    const [manualOrders, itemsCount] = await Promise.all([
      this.manualOrderRepository.find({
        take: itemsPerPage,
        skip,
      }),
      this.manualOrderRepository.count(),
    ]);

    return {
      manualOrders,
      itemsCount,
      itemsPerPage: Number(itemsPerPage),
      page: Number(page),
    };
  }

  async updateManualOrder(id: number, payload: CreateManualOrder) {
    const manualOrder = await this.manualOrderRepository.findOne({
      where: { manual_order_id: id },
    });
    if (!manualOrder) {
      throw new Error(`Manual order with id ${id} not found.`);
    }
    Object.assign(manualOrder, payload);

    return this.manualOrderRepository.save(manualOrder);
  }

  async deleteManualOrder(id: number) {
    const manualOrderToRemove = await this.manualOrderRepository.findOne({
      where: { manual_order_id: id },
    });
    if (!manualOrderToRemove) {
      throw new Error(`Manual order with id ${id} not found.`);
    }
    return await this.manualOrderRepository.remove(manualOrderToRemove);
  }

  getManualOrderById(id: number) {
    return this.manualOrderRepository.findOne({
      where: { manual_order_id: id },
    });
  }

  async uploadManualOrderFiles(files: Express.Multer.File[]) {
    const uploadedFiles = await this.awsService.uploadOrderFiles(files);
    console.log(uploadedFiles);

    return { files: uploadedFiles };
  }
}
