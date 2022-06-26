import { UsersRepository } from '../../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
      ignoreExpiration: false,
    });
  }
  async validate(payload: Payload) {
    const user = await this.usersRepository.findUserByIdWithoutPassword(
      payload.sub,
    );
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('접근오류');
    }
  }
}
