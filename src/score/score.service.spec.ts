import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GoalsModule } from '../goals/goals.module';
import { UsersModule } from '../users/users.module';
import { ScoreController } from './score.controller';
import { ScoreRepository } from './score.repository';
import { ScoreService } from './score.service';
import { Score, ScoreSchema } from './score.schema';
describe('ScoreService', () => {
  let service: ScoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
        GoalsModule,
      ],
      controllers: [ScoreController],
      providers: [ScoreService, ScoreRepository],
    }).compile();

    service = module.get<ScoreService>(ScoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findUserAndUpdateContinuity' ()=>{
  //   it ('must change continuity', ()=>{
  //     expect (service)
  //   })

  // })
});
