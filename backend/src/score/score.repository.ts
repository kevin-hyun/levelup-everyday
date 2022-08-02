import { Model, Types } from 'mongoose';
import * as moment from 'moment';
import { Injectable, UnauthorizedException, Type } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Goals } from '../goals/goals.schema';
import { Score } from './score.schema';

import { ScoreUpdateDto } from './dto/score.updateData.dto';
import { ScoreReadDateEndParamsDto } from './dto/score.read.DateEnd.dto';
import { ScoreInsertDto } from './dto/score.insert.dto';
import { ScoreReadParamsDto } from './dto/score.read.params';
import { ScoreReadBtwParamsDto } from './dto/score.read.btw.dto';
import { ScoreReadDateStartParamsDto } from './dto/score.read.DateStart.dto';

@Injectable()
export class ScoreRepository {
  constructor(
    @InjectModel(Score.name) private readonly scoreModel: Model<Score>,
  ) {}
  async create(score: number) {
    return await this.scoreModel.create({ score });
  }

  async getScoreBetweenDate(data: ScoreReadBtwParamsDto) {
    return await this.scoreModel.find({
      updatedAt: {
        $gte: data.startDate,
        $lte: data.endDate,
      },
      score: {
        $gt: 0,
      },
    });
  }

  async getScoreEndDate(
    userId: Types.ObjectId | string,
    data: ScoreReadDateEndParamsDto,
  ) {
    return await this.scoreModel.find({
      author: userId,
      updatedAt: {
        $lte: data.endDate,
      },
    });
  }

  async getScoreToday(userId: Types.ObjectId | string) {
    const date = moment().startOf('day').subtract(9, 'hour').format();
    return await this.scoreModel.find({
      author: userId,
      updatedAt: {
        $gte: date,
      },
    });
  }

  async getScoreData(userId: Types.ObjectId) {
    try {
      const result = await this.scoreModel
        .find({ author: userId })
        .populate({ path: 'goal', model: Goals, select: 'contents' });
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getScore(userId: Types.ObjectId, id: string) {
    try {
      const result = await this.scoreModel.find({
        author: userId,
        _id: id,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllScore(userId: Types.ObjectId) {
    try {
      const result = await this.scoreModel
        .find({
          author: userId,
        })
        .sort({ createdAt: 'asc' });

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async InsertData(score: ScoreInsertDto) {
    return await this.scoreModel.create(score);
  }
  async InsertManyData(insertData: Array<any>) {
    return await this.scoreModel.insertMany(insertData);
  }

  async updateData(userId: Types.ObjectId, updateData: ScoreUpdateDto) {
    //가져와서
    const date = moment().startOf('day').subtract(9, 'hour').format();
    const score = this.scoreModel.findOneAndUpdate(
      {
        author: userId,
        goal: updateData.goal,
        updatedAt: { $gte: date },
      },
      { score: updateData.score, updatedAt: moment().format() },
    );

    return score;
  }
}
