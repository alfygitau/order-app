import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/entities/Order';
import { OrderFile } from 'src/entities/Order-files';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { CreateOrderParams } from 'src/utils/orderTypes';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly awsService: AwsService,

    @InjectRepository(OrderFile)
    private readonly OrderFilesRepository: Repository<OrderFile>,
  ) {}

  async createOrder(orderPayload: CreateOrderParams) {
    let newOrder = await this.orderRepository.create(orderPayload);

    return await this.orderRepository.save(newOrder);
  }

  async getAllOrders() {
    return this.orderRepository.find({
      relations: [
        'order_type',
        'order_category',
        'order_subject',
        'academic_level',
        'order_pages',
        'order_style',
        'order_deadline',
        'order_references',
        'order_messages',
        'order_files',
      ],
    });
  }

  getAvailableOrders(availableStatus: string) {
    return this.orderRepository.find({
      where: { order_status: availableStatus },
    });
  }

  getCancelledOrders(cancelledStatus: string) {
    return this.orderRepository.find({
      where: { order_status: cancelledStatus },
    });
  }

  getCompletedOrders(completedStatus: string) {
    return this.orderRepository.find({
      where: { order_status: completedStatus },
    });
  }

  getPendingOrders(pendingStatus) {
    return this.orderRepository.find({
      where: { order_status: pendingStatus },
    });
  }

  async getOrderById(order_id: number) {
    const order = await this.orderRepository.findOne({
      where: { order_id },
      relations: [
        'order_type',
        'order_category',
        'order_subject',
        'academic_level',
        'order_pages',
        'order_style',
        'order_deadline',
        'order_references',
        'order_messages',
        'order_files',
      ],
    });

    if (!order) throw new NotFoundException();

    return order;
  }

  async addOrderFiles(order_id: number, files: Express.Multer.File[]) {
    const uploadedFileUrls = await this.awsService.uploadOrderFiles(files);
    const order = await this.getOrderById(order_id);

    const uploadedFiles: OrderFile[] = [];

    for (let i = 0; i < uploadedFileUrls.length; i++) {
      const url = uploadedFileUrls[i];

      // Create a new OrderFile instance
      const orderFile = new OrderFile();
      orderFile.order = order;
      orderFile.fileUrl = url;

      // Save the OrderFile
      const savedOrderFile = await this.OrderFilesRepository.save(orderFile);
      uploadedFiles.push(savedOrderFile);
    }

    const orderFileWithUrls = {
      fileId: uploadedFiles[0].fileId,
      order: uploadedFiles[0].order,
      fileUrl: uploadedFiles.map((file) => file.fileUrl),
    };

    return orderFileWithUrls;
  }

  async getOrderFiles(orderId: number) {
    let order = await this.getOrderById(orderId);

    return order.order_files;
  }
}
