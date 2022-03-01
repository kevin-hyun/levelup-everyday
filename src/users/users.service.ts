import { UsersCreateDto } from './dto/users.create.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getCurrentCat(): string {
    return '1111';
  }

  async signUp(body: UsersCreateDto) {
    const { email, name, password, imgUrl, role } = body;
    //duplicated email
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일이 이미 존재합니다.');
      /*
      throw new HttpException('해당하는 이메일이 이미 존재합니다. ', 403);
      */
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
      imgUrl,
      role,
    });
    console.log(user);
    return user.readOnlyData;
  }
}
