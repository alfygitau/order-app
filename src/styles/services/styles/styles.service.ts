import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Style } from 'src/entities/Style';
import { CreateStylesParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class StylesService {
  constructor(
    @InjectRepository(Style)
    private readonly styesRepository: Repository<Style>,
  ) {}

  async createStyle(stylePayload: CreateStylesParams) {
    const style = await this.styesRepository.create(stylePayload);

    return await this.styesRepository.save(style);
  }

  async findAllStyles() {
    return this.styesRepository.find();
  }
}
