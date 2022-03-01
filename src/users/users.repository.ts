import { UsersCreateDto } from './dto/users.create.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.userModel.exists({ email })) ? true : false;
    return result;
  }

  async create(user: UsersCreateDto): Promise<User> {
    return await this.userModel.create(user);
  }
}
