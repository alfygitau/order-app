import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
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
    @Query('page', ParseIntPipe) page?: number,
    @Query('itemsPerPage', ParseIntPipe) itemsPerPage?: number,
  ) {
    return this.referencesService.fetchAllReferences(page, itemsPerPage);
  }

  @Post('create')
  createAReference(@Body() referencePayload: CreateReference) {
    return this.referencesService.createReference(referencePayload);
  }
}
