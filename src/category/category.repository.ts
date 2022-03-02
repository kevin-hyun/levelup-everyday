import { CategoryCreateDto } from './dto/category.create.dto';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/users.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(user: User, data: CategoryCreateDto): Promise<Category> {
    console.log(data.name);
    const name = await this.categoryModel.find({ name: data.name });
    console.log(name);
    if (name.length !== 0) {
      throw new UnauthorizedException(
        `이미 해당 카테고리(${data.name})가 존재합니다`,
      );
    }

    const category = { name: data.name, author: user.email };

    return await this.categoryModel.create(category);
  }

  async findAdminCategory(): Promise<any> {
    const authorEmail = process.env.AUTHOR_EMAIL;
    const result = await this.categoryModel.find({ author: authorEmail });

    return result;
  }
}
