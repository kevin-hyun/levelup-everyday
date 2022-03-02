import { Category } from './../category/category.schema';
import { Goals } from './goals.schema';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GoalsDBInsertDto } from './dto/goals.createdto';

@Injectable()
export class GoalsRepository {
  constructor(
    @InjectModel(Goals.name) private readonly goalsModel: Model<Goals>,
  ) {}

  async createGoal(goal: GoalsDBInsertDto) {
    return await this.goalsModel.create(goal);
  }

  async getGoals(userId: string | Types.ObjectId) {
    console.log(userId);
    const result = await this.goalsModel.find({ author: userId.toString() });
    console.log(result);
    return result;
  }
}
