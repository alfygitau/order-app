import { Test, TestingModule } from '@nestjs/testing';
import { OrderMessageService } from './order-message.service';

describe('OrderMessageService', () => {
  let service: OrderMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderMessageService],
    }).compile();

    service = module.get<OrderMessageService>(OrderMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
