import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCitationStyles } from 'src/styles/dtos/CreateStyles.dto';
import { StylesService } from 'src/styles/services/styles/styles.service';

@Controller('citation-styles')
export class StylesController {
  constructor(private readonly stylesService: StylesService) {}

  @Get()
  getAllStyles() {
    return this.stylesService.findAllStyles();
  }

  @Post('create')
  createStyles(@Body() stylesPayload: CreateCitationStyles) {
    return this.stylesService.createStyle(stylesPayload);
  }
}
