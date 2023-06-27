import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateReference } from 'src/references/dtos/CreateReference.dto';
import { ReferencesService } from 'src/references/services/references/references.service';

@Controller('references')
export class ReferencesController {
  constructor(private readonly referencesService: ReferencesService) {}

  @Get()
  getAllReferences() {
    return this.referencesService.fetchAllReferences();
  }

  @Post('create')
  createAReference(@Body() referencePayload: CreateReference) {
    return this.referencesService.createReference(referencePayload);
  }
}
