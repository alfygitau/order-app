import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pages } from 'src/entities/Pages';
import { CreatePageParams } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Pages)
    private readonly pagesRepository: Repository<Pages>,
  ) {}

  async createPages(pagesPayload: CreatePageParams) {
    const newpages = await this.pagesRepository.create(pagesPayload);

    return this.pagesRepository.save(newpages);
  }

  async findAllPages() {
    return await this.pagesRepository.find();
  }

  async findPageById(pageId: number) {
    const page = await this.pagesRepository.findOneById(pageId);

    if (!page) throw new NotFoundException();

    return page;
  }

  async updatePage(pageId: number, pageData: CreatePageParams) {
    await this.pagesRepository.update(pageId, pageData);
    return this.findPageById(pageId);
  }

  async deletePage(pagesId: number) {
    await this.pagesRepository.delete(pagesId);

    return { message: 'Page deleted successfully' };
  }
}
