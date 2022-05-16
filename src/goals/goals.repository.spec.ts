import { GoalsRepository } from './goals.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { GoalsService } from './goals.service';
import { getModelToken } from '@nestjs/mongoose';
import { Goals } from './goals.schema';

describe('GoalsRepository', () => {
  let goalsService: GoalsService;
  let goalsRepository: GoalsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GoalsService,
        GoalsRepository,
        {
          provide: getModelToken(Goals.name),
          useFactory: () => {},
        },
      ],
    }).compile();

    goalsRepository = await module.get<GoalsRepository>(GoalsRepository);
    goalsService = module.get<GoalsService>(GoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
