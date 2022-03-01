import { UsersModule } from './../users/users.module';
import { JwtStrategy } from './jwt/jwt.strategy';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', sesssion: false }),
    JwtModule.register({
      secret: process.env.SECRETKEY,
      signOptions: { expiresIn: '1y' },
    }),
    //순환 참조 해결
    forwardRef(() => UsersModule),
  ],

  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
