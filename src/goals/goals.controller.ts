import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { GoalsService } from './goals.service';
import { CurrentUser } from '../common/decorators/user.decorator';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { User } from '../users/users.schema';
import { GoalsCreateDto } from './dto/goals.createdto';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @ApiOperation({ summary: 'goal 추가' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createGoal(@CurrentUser() user: User, @Body() data: GoalsCreateDto) {
    return this.goalsService.createGoal(user, data);
  }

  @ApiOperation({ summary: 'goal 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllGoal(@CurrentUser() user: User) {
    return this.goalsService.getAllGoal(user);
  }
}
