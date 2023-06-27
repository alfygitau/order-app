import { Test, TestingModule } from '@nestjs/testing';
import { RevisionFilesService } from './revision-files.service';

describe('RevisionFilesService', () => {
  let service: RevisionFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RevisionFilesService],
    }).compile();

    service = module.get<RevisionFilesService>(RevisionFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
