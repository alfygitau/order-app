import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderMessage } from 'src/entities/Order-message';
import { CreateMessageParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class OrderMessageService {
  constructor(
    @InjectRepository(OrderMessage)
    private readonly orderMessageRepository: Repository<OrderMessage>,
  ) {}

  async createOrderMessage(
    order_id: number,
    user_id: number,
    messagePayload: CreateMessageParams,
  ) {

    // bring in the order service

    const newMessage = await this.orderMessageRepository.create(messagePayload);

    return this.orderMessageRepository.save(newMessage);
  }

  async getOrderMessagesByOrderId() {
    return await this.orderMessageRepository.find();
  }
}
