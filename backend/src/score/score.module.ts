import { GoalsModule } from '../goals/goals.module';
import { Score, ScoreSchema } from './score.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ScoreRepository } from './score.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
    GoalsModule,
  ],
  controllers: [ScoreController],
  providers: [ScoreService, ScoreRepository],
})
export class ScoreModule {}
