import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AcademicLevel } from 'src/entities/Academic-level';
import { CreateAcademicLevelParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AcademicLevelService {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly academicLevelRepository: Repository<AcademicLevel>,
  ) {}

  async createAcademicLevel(academicLevelPayload: CreateAcademicLevelParams) {
    let newAcademicLevel = await this.academicLevelRepository.create(
      academicLevelPayload,
    );

    return this.academicLevelRepository.save(newAcademicLevel);
  }

  async findAllAcademicLevels() {
    return this.academicLevelRepository.find();
  }
}
