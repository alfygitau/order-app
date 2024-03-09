import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompletedOrderFile } from 'src/entities/Completed-order-files';
import { Order } from 'src/entities/Order';
import { OrderFile } from 'src/entities/Order-files';
import { OrderMessage } from 'src/entities/Order-message';
import { User } from 'src/entities/User';
import { AwsService } from 'src/order-files/services/aws/aws.service';
import { CreateOrderMessage } from 'src/order/dtos/CreateOrderMessage.dto';
import { UpdateOrder } from 'src/order/dtos/UpdateOrder.dto';
import { CreateOrderParams } from 'src/utils/orderTypes';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  private lastBigIntValue: bigint = BigInt(2345);
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly awsService: AwsService,

    @InjectRepository(OrderFile)
    private readonly OrderFilesRepository: Repository<OrderFile>,

    @InjectRepository(CompletedOrderFile)
    private readonly completeOrderFilesRepository: Repository<CompletedOrderFile>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(OrderMessage)
    private readonly orderMessageRepository: Repository<OrderMessage>,
  ) {}

  async createOrder(orderPayload: CreateOrderParams) {
    const now = new Date();
    const timestamp = now.toISOString().replace(/[-:.TZ]/g, '');

    let newOrder = await this.orderRepository.create({
      ...orderPayload,
    });

    return await this.orderRepository.save(newOrder);
  }

  getNextBigIntValue(): bigint {
    this.lastBigIntValue += BigInt(1);
    return this.lastBigIntValue;
  }

  async getAllOrders(userId, status) {
    return this.orderRepository.find({
      where: {
        user: { userId },
        order_status: status,
      },
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
        'user',
      ],
    });
  }
  async assignOrder(orderId: number) {
    let order = await this.getOrderById(orderId);
    // Check if the order exists
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    // Update the order_status field
    order.order_status = 'Assigned';

    // Save the updated Order back to the database
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async reAssignOrder(orderId: number) {
    let order = await this.getOrderById(orderId);
    // Check if the order exists
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    // Update the order_status field
    order.order_status = 'Active';

    // Save the updated Order back to the database
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async cancelOrder(orderId: number) {
    let order = await this.getOrderById(orderId);
    // Check if the order exists
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    // Update the order_status field
    order.order_status = 'Cancelled';

    // Save the updated Order back to the database
    const updatedOrder = await this.orderRepository.save(order);
    return updatedOrder;
  }

  async submitOrder(orderId: number, files: Express.Multer.File[]) {
    const uploadedFileUrls = await this.awsService.uploadOrderFiles(files);
    let order = await this.getOrderById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const uploadedFiles: CompletedOrderFile[] = [];
    // Create a new OrderFile instance
    for (let i = 0; i < uploadedFileUrls.length; i++) {
      const url = uploadedFileUrls[i];
      const orderFile = new CompletedOrderFile();
      orderFile.order = order;
      orderFile.fileUrl = url;

      // Save the OrderFile
      const savedOrderFile = await this.completeOrderFilesRepository.save(
        orderFile,
      );
      uploadedFiles.push(savedOrderFile);
    }

    const completeOrderFileWithUrls = {
      fileId: uploadedFiles[0].fileId,
      order: uploadedFiles[0].order,
      fileUrl: uploadedFiles.map((file) => file.fileUrl),
    };
    order.order_status = 'Completed';
    const updatedOrder = await this.orderRepository.save(order);

    return { order: updatedOrder, files: completeOrderFileWithUrls };
  }

  getAvailableOrders() {
    return this.orderRepository.find({
      where: { order_status: 'Available' },
    });
  }

  getCancelledOrders() {
    return this.orderRepository.find({
      where: { order_status: 'Cancelled' },
    });
  }

  getCompletedOrders() {
    return this.orderRepository.find({
      where: { order_status: 'Completed' },
    });
  }

  getPendingOrders() {
    return this.orderRepository.find({
      where: { order_status: 'Pending' },
    });
  }

  getAssignedOrders() {
    return this.orderRepository.find({
      where: { order_status: 'Assigned' },
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
        'revision_files',
        'order_revision',
        'user',
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

  async removeOrderFile(fileId: number) {
    // Retrieve the OrderFile entity based on the fileId
    const orderFileToRemove = await this.OrderFilesRepository.findOne({
      where: { fileId },
      relations: ['order'],
    });

    if (!orderFileToRemove) {
      throw new NotFoundException(`OrderFile with ID ${fileId} not found`);
    }

    const order = orderFileToRemove.order;
    if (order) {
      order.order_files = order.order_files?.filter(
        (file) => file.fileId !== fileId,
      );
      await this.orderRepository.save(order);
    }

    // Delete file from the database
    await this.OrderFilesRepository.remove(orderFileToRemove);
  }

  async getOrderFiles(orderId: number) {
    let order = await this.getOrderById(orderId);
    return order.order_files;
  }

  async getOrderRevisions(orderId: number) {
    let order = await this.getOrderById(orderId);
    return order.order_revision;
  }

  async getOrderMessages(orderId: number) {
    let order = await this.getOrderById(orderId);
    return order.order_messages;
  }
  async createOrderMessage(orderId, payload: CreateOrderMessage) {
    let order = await this.getOrderById(orderId);
    const user = await this.userRepository.findOne({
      where: { userId: payload.user_id },
    });
    const orderMessage = new OrderMessage();
    orderMessage.order_id = order;
    orderMessage.user_id = user;
    orderMessage.message_content = payload.message_content;

    return this.orderMessageRepository.save(orderMessage);
  }
  async updateOrder(orderId, payload: UpdateOrder) {
    const order = await this.getOrderById(orderId);

    order.academic_level = payload.academic_level;
    order.order_style = payload.order_style;
    order.order_subject = payload.order_subject;
    order.order_category = payload.order_category;
    order.order_deadline = payload.order_deadline;
    order.order_pages = payload.order_pages;
    order.order_references = payload.order_references;
    order.order_type = payload.order_type;

    order.order_instructions = payload.order_instructions;
    order.order_status = payload.order_status;
    order.order_spacing = payload.order_spacing;
    order.order_additional_information = payload.order_additional_information;
    order.order_topic = payload.order_topic;
    order.order_amount = payload.order_amount;
    order.phone_number = payload.phone_number;

    const updatedOrder = await this.orderRepository.save(order);

    return updatedOrder;
  }
}
