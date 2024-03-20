import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReference } from 'src/references/dtos/CreateReference.dto';
import { ReferencesService } from 'src/references/services/references/references.service';

@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  getAllReferences(
    @Query('page') page?: number,
    @Query('itemsPerPage') itemsPerPage?: number,
  ) {
    return this.referencesService.fetchAllReferences(page, itemsPerPage);
  }

  @Post('create')
  createAReference(@Body() referencePayload: CreateReference) {
    return this.referencesService.createReference(referencePayload);
  }

  @Patch(':id')
  updateReference(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePayload: CreateReference,
  ) {
    return this.referencesService.updateReference(id, updatePayload);
  }
}
