import { Injectable, UnauthorizedException, Type } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
  ) {}
  async create(score: number) {
    return await this.scoreModel.create({ score });
  }

  async getScoreDateBetween(dateStart: Date, dateEnd: Date) {
    return await this.scoreModel.find({
      updatedAt: { $gte: dateStart, $lte: dateEnd },
    });
  }
}
