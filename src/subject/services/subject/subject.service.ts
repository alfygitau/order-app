import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/entities/Subject';
import { CreateSubjectParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  async createSubject(subjectPayload: CreateSubjectParams) {
    const newSubject = await this.subjectRepository.create(subjectPayload);

    return await this.subjectRepository.save(newSubject);
  }

  async findAllSubjects() {
    return await this.subjectRepository.find();
  }

  async updateOrderSubject(id, payload: CreateSubjectParams) {
    const orderSubject = await this.subjectRepository.findOne({
      where: { order_subject_id: id },
    });

    if (!orderSubject) {
      throw new NotFoundException(`Subject with ID '${id}' not found.`);
    }

    Object.assign(orderSubject, payload);

    return this.subjectRepository.save(orderSubject);
  }

  async deleteOrderSubject(id: number) {
    const orderSubject = await this.subjectRepository.findOne({
      where: { order_subject_id: id },
    });

    if (!orderSubject) {
      throw new NotFoundException(`Subject with ID '${id}' not found.`);
    }

    return this.subjectRepository.remove(orderSubject);
  }
}
