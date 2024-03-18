import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderCategory } from 'src/entities/Order-category';
import { CreateOrderCategoryParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OrderCategoryService {
  constructor(
    @InjectRepository(OrderCategory)
    private readonly orderCategoryRepository: Repository<OrderCategory>,
  ) {}

  async createOrderCategory(orderCategoryPayload: CreateOrderCategoryParams) {
    const newOrderCategory = await this.orderCategoryRepository.create(
      orderCategoryPayload,
    );
    return await this.orderCategoryRepository.save(newOrderCategory);
  }

  async findAllOrderCategories(page: number = 1, itemsPerPage: number = 10) {
    const skip = (page - 1) * itemsPerPage;

    const orderCategories = await this.orderCategoryRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.orderCategoryRepository.count();
    return { orderCategories, itemsPerPage, page, itemsCount };
  }

  async findOrderCategoryById(orderCategoryId: number) {
    const orderCategory = await this.orderCategoryRepository.findOneById(
      orderCategoryId,
    );
    if (!orderCategory) throw new NotFoundException();

    return orderCategory;
  }

  async updateOrderCategory(
    orderCategoryId: number,
    orderCategoryPayload: CreateOrderCategoryParams,
  ) {
    let orderCategory = await this.findOrderCategoryById(orderCategoryId);

    Object.assign(orderCategory, orderCategoryPayload);
    return await this.orderCategoryRepository.save(orderCategory);
  }

  async deleteOrderCategory(id: number) {
    await this.orderCategoryRepository.delete(id);

    return { message: 'Order category deleted' };
  }
}
