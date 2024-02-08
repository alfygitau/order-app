import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateAcademicLevel } from 'src/academic-level/dtos/CreateAcademicLevel.dto';
import { AcademicLevelService } from 'src/academic-level/services/academic-level/academic-level.service';

@Controller('academic-levels')
export class AcademicLevelController {
  constructor(private readonly academicLevelService: AcademicLevelService) {}

  @Get()
  getAllAcademicLevels() {
    return this.academicLevelService.findAllAcademicLevels();
  }

  @Post('create')
  createAcademicLevel(@Body() academicLevelPayload: CreateAcademicLevel) {
    return this.academicLevelService.createAcademicLevel(academicLevelPayload);
  }
}
