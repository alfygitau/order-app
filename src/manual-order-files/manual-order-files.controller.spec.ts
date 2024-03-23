import { Test, TestingModule } from '@nestjs/testing';
import { ManualOrderFilesController } from './manual-order-files.controller';

describe('ManualOrderFilesController', () => {
  let controller: ManualOrderFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManualOrderFilesController],
    }).compile();

    controller = module.get<ManualOrderFilesController>(ManualOrderFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
