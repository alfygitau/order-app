import { Test, TestingModule } from '@nestjs/testing';
import { OrderRevisionController } from './order-revision.controller';

describe('OrderRevisionController', () => {
  let controller: OrderRevisionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderRevisionController],
    }).compile();

    controller = module.get<OrderRevisionController>(OrderRevisionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
