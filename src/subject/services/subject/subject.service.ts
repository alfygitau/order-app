import { Injectable } from '@nestjs/common';
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
}
