import { CategoryCreateDto } from './dto/category.create.dto';
import { CategoryService } from './category.service';
import { CurrentUser } from './../common/decorators/user.decorator';
import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { User } from '../users/users.schema';
import { Cron, CronExpression } from '@nestjs/schedule';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiOperation({ summary: '카테고리 추가' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createCategory(@CurrentUser() user: User, @Body() body: CategoryCreateDto) {
    return this.categoryService.createCategory(user, body);
  }

  @ApiOperation({ summary: '기본 카테고리 가져오기' })
  @Get('default')
  getAllCategory() {
    return this.categoryService.getAllCategory();
  }
}
