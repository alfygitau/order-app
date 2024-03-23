import { Test, TestingModule } from '@nestjs/testing';
import { ManualOrderFilesService } from './manual-order-files.service';

describe('ManualOrderFilesService', () => {
  let service: ManualOrderFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualOrderFilesService],
    }).compile();

    service = module.get<ManualOrderFilesService>(ManualOrderFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
