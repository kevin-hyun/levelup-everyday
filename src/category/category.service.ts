import { CategoryCreateDto } from './dto/category.create.dto';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { User } from '../users/users.schema';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(user: User, data: CategoryCreateDto) {
    if (user.role !== 1) {
      throw new UnauthorizedException('카테고리 생성 권한이 없습니다.');
    }

    const result = this.categoryRepository.createCategory(user, data);
    return result;
  }

  async getAllCategory() {
    const result = this.categoryRepository.findAdminCategory();
    return result;
  }
}
