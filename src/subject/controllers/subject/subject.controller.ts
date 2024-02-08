import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateSubject } from 'src/subject/dtos/CreateSubject.dto';
import { SubjectService } from 'src/subject/services/subject/subject.service';

@Controller('order-subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  getAllSubjects() {
    return this.subjectService.findAllSubjects();
  }

  @Post('create')
  createSubject(@Body() subjectPayload: CreateSubject) {
    return this.subjectService.createSubject(subjectPayload);
  }
}
