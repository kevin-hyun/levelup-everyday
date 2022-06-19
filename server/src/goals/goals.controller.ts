import { JwtAuthGuard } from './../auth/jwt/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
import { GoalsUpdateDto } from './dto/goals.updatedto';

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
    return this.goalsService.getAllGoals(user);
  }

  @ApiOperation({ summary: 'goal 수정하기' })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateGoal(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Body() data: GoalsUpdateDto,
  ) {
    return this.goalsService.updateGoal(user, id, data);
  }

  @ApiOperation({ summary: 'goal 삭제하기' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteGoal(@CurrentUser() user: User, @Param('id') id: string) {
    return this.goalsService.deleteGoal(user, id);
  }
}
