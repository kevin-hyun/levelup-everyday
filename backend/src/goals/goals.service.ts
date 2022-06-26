import { GoalsUpdateDto } from './dto/goals.updatedto';
import { CategoryRepository } from '../category/category.repository';
import { GoalsCreateDto } from './dto/goals.createdto';
import { User } from '../users/users.schema';
import { GoalsRepository } from './goals.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class GoalsService {
  constructor(
    private readonly goalsRepository: GoalsRepository,
    private readonly categoryRepository: CategoryRepository,
  ) {}
  async createGoal(user: User, data: GoalsCreateDto) {
    const categoryName = data.category;
    const category = await this.categoryRepository.findCategoryById(
      categoryName,
    );

    const goal = {
      author: user.id,
      category: category._id,
      contents: data.contents,
      softDelete: false,
    };
    return this.goalsRepository.createGoal(goal);
  }

  async getAllGoals(user: User) {
    const userId = user._id;
    const result = this.goalsRepository.getAllGoals(userId);
    return result;
  }

  async updateGoal(user: User, id: string, data: GoalsUpdateDto) {
    const categoryName = data.category;
    const softDelete = data.softDelete;
    const category = await this.categoryRepository.findCategoryById(
      categoryName,
    );

    const changedContents = {
      category: category._id,
      contents: data.contents,
      softDelete,
    };
    return this.goalsRepository.updateGoal(id, changedContents);
  }

  async deleteGoal(user: User, id: string) {
    return this.goalsRepository.deleteGoal(user, id);
  }
}
