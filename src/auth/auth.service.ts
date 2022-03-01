import { UsersRepository } from './../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async jwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;

    //email exist?
    const user = await this.usersRepository.findUserByEmail(email);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    //password correct?
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    console.log(isPasswordValidated);

    if (!isPasswordValidated) {
      throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
    }

    const payload = { email: email, sub: user.id };
    console.log(payload);
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
