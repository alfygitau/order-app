import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePages } from 'src/pages/dtos/CreatePages.dto';
import { PagesService } from 'src/pages/services/pages/pages.service';

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Get()
  getAllPages() {
    return this.pagesService.findAllPages();
  }

  @Post('create')
  createPages(@Body() pagesPayload: CreatePages) {
    return this.pagesService.createPages(pagesPayload);
  }

  @Get(':pageId')
  getPagesById(@Param('pageId') id: number) {
    return this.pagesService.findPageById(id);
  }

  @Patch(':pageId')
  updatePage(@Param('pageId') id: number, @Body() pagesPayload: CreatePages) {
    return this.pagesService.updatePage(id, pagesPayload);
  }

  @Delete(':pageId')
  deletePage(@Param('pageId') id: number) {
    return this.pagesService.deletePage(id);
  }
}
