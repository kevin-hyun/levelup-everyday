import { Injectable, UnauthorizedException, Type } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { ScoreInsertDto } from './dto/score.insert.dto';

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
  async getScoreLastData(userId: Types.ObjectId) {
    try {
      const result = await this.scoreModel
        .find({ author: userId })
        .sort({ dateCreated: -1 });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async InsertData(score: ScoreInsertDto) {
    return await this.scoreModel.create(score);
  }
}
