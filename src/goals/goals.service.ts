import { CategoryRepository } from './../category/category.repository';
import { GoalsCreateDto } from './dto/goals.createdto';
import { User } from './../users/users.schema';
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
    const category = await this.categoryRepository.findCategoryByName(
      categoryName,
    );

    const goal = {
      author: user.id,
      category: category._id,
      contents: data.contents,
    };
    return this.goalsRepository.createGoal(goal);
  }
}
