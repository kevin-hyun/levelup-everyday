import { ReadOnlyUserDto } from './dto/users.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Post } from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { UsersCreateDto } from './dto/users.create.dto';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getCurrentCat() {
    return '1';
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

  @Post('login')
  logIn() {
    return '1';
  }

  @Post('logout')
  logOut() {
    return '1';
  }
}
