import { ScoreReadDateEndParamsDto } from './dto/score.read.DateEnd.dto copy';
import { Goals } from './../goals/goals.schema';
import { Injectable, UnauthorizedException, Type } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Score } from './score.schema';
import { ScoreInsertDto } from './dto/score.insert.dto';
import { ScoreReadParamsDto } from './dto/score.read.params';
import mongoose from 'mongoose';
import { ScoreReadBtwParamsDto } from './dto/score.read.btw.dto';

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
}
