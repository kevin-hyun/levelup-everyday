import { UsersCreateDto } from './dto/users.create.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as Bcrypt from 'bcryptjs';
import { UsersRepository } from './users.repository';
import { User } from './users.schema';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signUp(body: UsersCreateDto) {
    const { email, name, password } = body;
    //duplicated email
    const isUserExist = await this.usersRepository.existsByEmail(email);

    if (isUserExist) {
      throw new UnauthorizedException('해당하는 이메일이 이미 존재합니다.');
    }
    const salt = await Bcrypt.genSalt(10);
    const hashedPassword = await Bcrypt.hash(password, salt);

    const user = await this.usersRepository.create({
      email,
      name,
      password: hashedPassword,
      passwordConfirm: hashedPassword,
    });

    return user.readOnlyData;
  }

  async uploadImg(user: User, files: Express.Multer.File[]) {
    const fileName = `users/${files[0].filename}`;

    const newUser = await this.usersRepository.findUserByIdAndUpdateImg(
      user.id,
      fileName,
    );

    return newUser;
  }
}
