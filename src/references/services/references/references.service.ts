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

  fetchAllReferences() {
    return this.referencesRepository.find();
  }
}
