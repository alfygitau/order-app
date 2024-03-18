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
    const academicLevel = await this.academicLevelRepository.findOne({
      where: { academic_level_id: id },
    });

    if (!academicLevel) {
      throw new NotFoundException(`Academic level with ID '${id}' not found.`);
    }
    // Apply updates to the entity
    Object.assign(academicLevel, updatePayload);

    // Save the updated entity
    const updatedAcademicLevel = await this.academicLevelRepository.save(
      academicLevel,
    );
    return updatedAcademicLevel;
  }

  async deleteAcademicLevel(id: number): Promise<void> {
    const academicLevel = await this.academicLevelRepository.findOne({
      where: { academic_level_id: id },
    });
    await this.academicLevelRepository.remove(academicLevel);
  }
}
