import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateAcademicLevel(id, updatePayload: CreateAcademicLevelParams) {
    // Find the academic level by ID
    const academicLevel = await this.academicLevelRepository.findOne({
      where: { academic_level_id: id },
    });

    // If academic level not found, throw NotFoundException
    if (!academicLevel) {
      throw new NotFoundException('Academic level not found');
    }

    academicLevel.academic_level_code = updatePayload?.academic_level_code;
    academicLevel.academic_level_description =
      updatePayload?.academic_level_description;
    academicLevel.academic_level_name = updatePayload?.academic_level_name;
    academicLevel.academic_level_value = updatePayload?.academic_level_value;

    // Save the changes
    return this.academicLevelRepository.save(academicLevel);
  }

  async deleteAcademicLevel(id: number): Promise<void> {
    const academicLevel = await this.academicLevelRepository.findOne({
      where: { academic_level_id: id },
    });
    await this.academicLevelRepository.remove(academicLevel);
  }
}
