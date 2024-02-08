import { Test, TestingModule } from '@nestjs/testing';
import { OrderMessageController } from './order-message.controller';

describe('OrderMessageController', () => {
  let controller: OrderMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderMessageController],
    }).compile();

    controller = module.get<OrderMessageController>(OrderMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
