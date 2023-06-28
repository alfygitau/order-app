import { Test, TestingModule } from '@nestjs/testing';
import { OrderRevisionService } from './order-revision.service';

describe('OrderRevisionService', () => {
  let service: OrderRevisionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderRevisionService],
    }).compile();

    service = module.get<OrderRevisionService>(OrderRevisionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
