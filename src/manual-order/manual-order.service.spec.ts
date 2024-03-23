import { Test, TestingModule } from '@nestjs/testing';
import { ManualOrderService } from './manual-order.service';

describe('ManualOrderService', () => {
  let service: ManualOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManualOrderService],
    }).compile();

    service = module.get<ManualOrderService>(ManualOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
