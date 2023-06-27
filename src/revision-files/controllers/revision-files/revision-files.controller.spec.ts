import { Test, TestingModule } from '@nestjs/testing';
import { RevisionFilesController } from './revision-files.controller';

describe('RevisionFilesController', () => {
  let controller: RevisionFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RevisionFilesController],
    }).compile();

    controller = module.get<RevisionFilesController>(RevisionFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
