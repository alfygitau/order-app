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

  async findAllSubjects(page: number, itemsPerPage: number) {
    // If page and itemsPerPage are not provided, fetch all data
    if (!page || !itemsPerPage) {
      return await this.subjectRepository.find();
    }
    const skip = (Number(page) - 1) * Number(itemsPerPage);

    const orderSubjects = await this.subjectRepository.find({
      take: itemsPerPage,
      skip,
    });

    // Query to count the total number of order types
    const itemsCount = await this.subjectRepository.count();

    return { orderSubjects, itemsPerPage, page, itemsCount };
  }

  async updateOrderSubject(id, payload: CreateSubjectParams) {
    const orderSubject = await this.subjectRepository.findOne({
      where: { order_subject_id: id },
    });

    if (!orderSubject) {
      throw new NotFoundException(`Subject with ID '${id}' not found.`);
    }

    Object.assign(orderSubject, payload);

    // Save the updated entity
    const updatedOrderSubject = await this.subjectRepository.save(orderSubject);
    return updatedOrderSubject;
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
