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

  async findUserByIdAndUpdateImg(id: string, fileName: string) {
    const user = await this.userModel.findById(id);
    user.imgUrl = `http://localhost:8000/media/${fileName}`;
    const newUser = await user.save();
    console.log(newUser);
    return newUser.readOnlyData;
  }

  async findUserByIdWithoutPassword(userId: string): Promise<User | null> {
    //password 제외하고
    const user = await await this.userModel
      .findById(userId)
      .select('-password');
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const result = (await this.userModel.exists({ email })) ? true : false;
    return result;
  }

  async create(user: UsersCreateDto): Promise<User> {
    delete user.passwordConfirm;
    return await this.userModel.create(user);
  }
}
