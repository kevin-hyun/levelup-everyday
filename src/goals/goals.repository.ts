import { Category } from './../category/category.schema';
import { Goals } from './goals.schema';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
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
}
