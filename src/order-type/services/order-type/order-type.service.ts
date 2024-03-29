import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from 'src/entities/Order-type';
import { OrderTypeParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OrderTypeService {
  constructor(
    @InjectRepository(OrderType)
    private readonly orderTypeRepository: Repository<OrderType>,
  ) {}

  async createOrderType(orderTypePayload: OrderTypeParams) {
    const newOrderType = await this.orderTypeRepository.create(
      orderTypePayload,
    );
    return this.orderTypeRepository.save(newOrderType);
  }
  async getOrderTypeById(orderTypeId: number) {
    const order_type = await this.orderTypeRepository.findOneById(orderTypeId);

    if (!order_type) throw new NotFoundException();

    return order_type;
  }

  async getAllOrderTypes(page: number, itemsPerPage: number) {
    // If page and itemsPerPage are not provided, fetch all data
    if (!page || !itemsPerPage) {
      return await this.orderTypeRepository.find();
    }
    const skip = (Number(page) - 1) * Number(itemsPerPage);
    const orderTypes = await this.orderTypeRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.orderTypeRepository.count();

    return { orderTypes, page, itemsPerPage, itemsCount };
  }

  async updateOrderType(orderTypeId: number, orderTypeData: OrderTypeParams) {
    const order_type = await this.getOrderTypeById(orderTypeId);

    if (!order_type) throw new NotFoundException();

    Object.assign(order_type, orderTypeData);
    return this.orderTypeRepository.save(order_type);
  }

  async deleteOrderType(orderTypeId: number): Promise<{}> {
    await this.orderTypeRepository.delete(orderTypeId);

    return { message: 'Order type deleted' };
  }
}
