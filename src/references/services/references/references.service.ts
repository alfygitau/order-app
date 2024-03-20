import { Injectable, NotFoundException } from '@nestjs/common';
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

  async fetchAllReferences(page: number, itemsPerPage: number) {
    // If page and itemsPerPage are not provided, fetch all data
    if (!page || !itemsPerPage) {
      return await this.referencesRepository.find();
    }
    const skip = (Number(page) - 1) * Number(itemsPerPage);

    const orderReferences = await this.referencesRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.referencesRepository.count();

    return { orderReferences, page, itemsPerPage, itemsCount };
  }

  async updateReference(id: number, updatePayload: CreateReferences) {
    const reference = await this.referencesRepository.findOne({
      where: { reference_id: id },
    });

    if (!reference) throw new NotFoundException('Reference not found');

    Object.assign(reference, updatePayload);

    return this.referencesRepository.save(reference);
  }
}
