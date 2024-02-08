import { Test, TestingModule } from '@nestjs/testing';
import { UrgencyController } from './urgency.controller';

describe('UrgencyController', () => {
  let controller: UrgencyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrgencyController],
    }).compile();

    controller = module.get<UrgencyController>(UrgencyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
