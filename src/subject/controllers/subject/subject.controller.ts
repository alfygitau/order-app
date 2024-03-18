import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateSubject } from 'src/subject/dtos/CreateSubject.dto';
import { SubjectService } from 'src/subject/services/subject/subject.service';

@Controller('order-subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get()
  getAllSubjects(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.subjectService.findAllSubjects(page, itemsPerPage);
  }

  @Post('create')
  createSubject(@Body() subjectPayload: CreateSubject) {
    return this.subjectService.createSubject(subjectPayload);
  }

  @Patch(':id')
  updateOrderSubject(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: CreateSubject,
  ) {
    return this.subjectService.updateOrderSubject(id, payload);
  }

  @Delete(':id')
  deleteOrderSubject(@Param('id', ParseIntPipe) id: number) {
    return this.subjectService.deleteOrderSubject(id);
  }
}
