import { Injectable, UnauthorizedException, Type } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
  ) {}
  async createScore(data: data) {
    return await this.scoreModel.create();
  }

  async findScoreByGoalId(
    user: string | Types.ObjectId,
    id: string | Types.ObjectId,
  ) {
    await scoreMdoel.find();
  }

  //   async createGoal(goal: GoalsDBInsertDto) {
  //     return await this.goalsModel.create(goal);
  //   }
}
