import { Test, TestingModule } from '@nestjs/testing';
import { ManualOrderController } from './manual-order.controller';

describe('ManualOrderController', () => {
  let controller: ManualOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManualOrderController],
    }).compile();

    controller = module.get<ManualOrderController>(ManualOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
