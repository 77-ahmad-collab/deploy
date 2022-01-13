import { Test, TestingModule } from '@nestjs/testing';
import { InternalAdvisorController } from './internal-advisor.controller';

describe('InternalAdvisorController', () => {
  let controller: InternalAdvisorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalAdvisorController],
    }).compile();

    controller = module.get<InternalAdvisorController>(InternalAdvisorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
