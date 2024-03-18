import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Urgency } from 'src/entities/Urgency';
import { CreateDeadlineParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class UrgencyService {
  constructor(
    @InjectRepository(Urgency)
    private readonly urgencyRepository: Repository<Urgency>,
  ) {}

  async createDeadline(deadlinePayload: CreateDeadlineParams) {
    let newDeadline = await this.urgencyRepository.create(deadlinePayload);

    return await this.urgencyRepository.save(newDeadline);
  }

  async findAllDeadlines(page: number, itemsPerPage: number) {
    // If page and itemsPerPage are not provided, fetch all data
    if (!page || !itemsPerPage) {
      return await this.urgencyRepository.find();
    }
    const skip = (Number(page) - 1) * Number(itemsPerPage);

    const orderDeadlines = await this.urgencyRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.urgencyRepository.count();

    return { orderDeadlines, itemsPerPage, page, itemsCount };
  }

  async updateOrderDeadline(id, updatePayload) {
    const orderUrgency = await this.urgencyRepository.findOne({
      where: { urgency_id: id },
    });

    if (!orderUrgency) {
      throw new NotFoundException(`Academic level with ID '${id}' not found.`);
    }
    // Apply updates to the entity
    Object.assign(orderUrgency, updatePayload);

    // Save the updated entity
    const updatedOrderUrgency = await this.urgencyRepository.save(orderUrgency);
    return updatedOrderUrgency;
  }

  async deleteOrderUrgency(id: number) {
    const orderUrgency = await this.urgencyRepository.findOne({
      where: { urgency_id: id },
    });

    return this.urgencyRepository.remove(orderUrgency);
  }
}
