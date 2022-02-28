import { UsersCreateDto } from './dto/users.create.dto';
import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  getCurrentCat(): string {
    return '1111';
  }

  async signUp(body: UsersCreateDto) {
    const { email, name, password, passwordConfirm, imgUrl } = body;
    //duplicated email
    const isUserExist = await this.userModel.exists({ email });

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일이 이미 존재합니다.');
      /*
      throw new HttpException('해당하는 이메일이 이미 존재합니다. ', 403);
      */
    }
    if (password !== passwordConfirm) {
      throw new UnauthorizedException('입력하신 비밀번호가 일치하지 않습니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      name,
      password: hashedPassword,
      imgUrl,
    });
    return user.readOnlyData;
  }
}
