import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from 'src/entities/References';
import { CreateReferences } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectRepository(Reference)
    private readonly referencesRepository: Repository<Reference>,
  ) {}

  async createReference(referencePayload: CreateReferences) {
    const newReference = await this.referencesRepository.create(
      referencePayload,
    );

    return await this.referencesRepository.save(newReference);
  }

  async fetchAllReferences(page: number = 1, itemsPerPage: number = 10) {
    const skip = (page - 1) * itemsPerPage;

    const orderReferences = await this.referencesRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.referencesRepository.count();

    return { orderReferences, page, itemsPerPage, itemsCount };
  }
}
