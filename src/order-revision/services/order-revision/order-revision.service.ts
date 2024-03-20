import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRevision } from 'src/entities/Order-revision';
import { OrderService } from 'src/order/services/order/order.service';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateOrderRevisionParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OrderRevisionService {
  constructor(
    @InjectRepository(OrderRevision)
    private readonly orderRevisionRepository: Repository<OrderRevision>,

    private readonly userService: UsersService,
    private readonly orderService: OrderService,
  ) {}
  async createOrderRevision(
    orderId: number,
    userId: number,
    revisionPayload: CreateOrderRevisionParams,
  ) {
    let user = await this.userService.findUserById(userId);
    let order = await this.orderService.getOrderById(orderId);

    let newRevision = await this.orderRevisionRepository.create({
      ...revisionPayload,
      created_by: user,
      order: order,
    });

    return await this.orderRevisionRepository.save(newRevision);
  }

  getAllRevisions() {
    return this.orderRevisionRepository.find({
      relations: ['order'],
    });
  }
  getOrderRevisionById(revisionId) {
    return this.orderRevisionRepository.findOne({
      where: { revision_id: revisionId },
      relations: ['order'],
    });
  }

  async getOrderRevisionsByOrderId(orderId: number) {
    return this.orderRevisionRepository.find({
      where: { order: { order_id: orderId } },
      relations: ['order'],
    });
  }
}
