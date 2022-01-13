import { Test, TestingModule } from '@nestjs/testing';
import { InternalAdvisorService } from './internal-advisor.service';

describe('InternalAdvisorService', () => {
  let service: InternalAdvisorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternalAdvisorService],
    }).compile();

    service = module.get<InternalAdvisorService>(InternalAdvisorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
