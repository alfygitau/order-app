import { Injectable } from '@nestjs/common';
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

  async findAllDeadlines() {
    return await this.urgencyRepository.find();
  }
}
