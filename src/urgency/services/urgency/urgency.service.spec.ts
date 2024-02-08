import { Test, TestingModule } from '@nestjs/testing';
import { UrgencyService } from './urgency.service';

describe('UrgencyService', () => {
  let service: UrgencyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrgencyService],
    }).compile();

    service = module.get<UrgencyService>(UrgencyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
