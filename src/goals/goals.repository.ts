import { GoalsUpdateDto } from './dto/goals.updatedto';
import { User } from './../users/users.schema';
import { Category } from './../category/category.schema';
import { Goals } from './goals.schema';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GoalsCreateDto, GoalsDBInsertDto } from './dto/goals.createdto';

@Injectable()
export class GoalsRepository {
  constructor(
    @InjectModel(Goals.name) private readonly goalsModel: Model<Goals>,
  ) {}

  async createGoal(goal: GoalsDBInsertDto) {
    return await this.goalsModel.create(goal);
  }

  async updateGoal(id: string, changedContents: GoalsUpdateDto) {
    const goal = await this.getGoal(id);
    goal.category = changedContents.category;
    goal.contents = changedContents.contents;

    return await goal.save();
  }

  async getAllGoals(userId: string | Types.ObjectId) {
    const id = typeof userId === 'string' ? userId : userId.toString();
    const result = await this.goalsModel.find({
      author: id,
      softDelete: false,
    });
    return result;
  }

  async deleteGoal(user: User, id: string | Types.ObjectId) {
    const goal = await this.goalsModel.findById(id);
    if (user.role === 0) {
      if (goal.author !== user._id.toString()) {
        throw new UnauthorizedException('삭제 권한이 없습니다.');
      }
    }
    goal.softDelete = true;
    return await goal.save();
  }

  async getGoal(id: string | Types.ObjectId) {
    return await this.goalsModel.findById(id);
  }
}
