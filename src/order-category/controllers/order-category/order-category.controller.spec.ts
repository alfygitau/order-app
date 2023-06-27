import { Test, TestingModule } from '@nestjs/testing';
import { OrderCategoryController } from './order-category.controller';

describe('OrderCategoryController', () => {
  let controller: OrderCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderCategoryController],
    }).compile();

    controller = module.get<OrderCategoryController>(OrderCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
