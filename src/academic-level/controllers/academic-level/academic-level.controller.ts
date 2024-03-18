import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch(':id')
  updateAcademicLevel(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePayload: CreateAcademicLevel,
  ) {
    return this.academicLevelService.updateAcademicLevel(id, updatePayload);
  }

  @Delete(':id')
  removeAcademicLevel(@Param('id', ParseIntPipe) id: number) {
    return this.academicLevelService.deleteAcademicLevel(id);
  }
}
