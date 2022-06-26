import { multerOptions } from '../common/utils/multer.options';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { LoginRequestDto } from '../auth/dto/login.request.dto';
import { AuthService } from '../auth/auth.service';
import { ReadOnlyUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  UploadedFiles,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Post } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UsersCreateDto } from './dto/users.create.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/user.decorator';
import { User } from './users.schema';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: '현재 유저 정보 가져오기',
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentUser(@CurrentUser() user: User) {
    return user.readOnlyData;
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error ...',
  })
  @ApiResponse({
    status: 201,
    description: '가입 성공',
    type: ReadOnlyUserDto,
  })
  @Post('/register')
  async signUp(@Body() body: UsersCreateDto) {
    return await this.usersService.signUp(body);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogIn(data);
  }

  @ApiOperation({ summary: '유저 프로필사진 업로드' })
  @UseInterceptors(FilesInterceptor('image', 1, multerOptions('users')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadUserImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() user: User,
  ) {
    return this.usersService.uploadImg(user, files);
  }
}
