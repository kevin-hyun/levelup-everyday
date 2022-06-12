import { ScoreService } from './score.service';
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
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CurrentUser } from '../common/decorators/user.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { SuccessInterceptor } from '../common/interceptors/success.interceptor';
import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { User } from '../users/users.schema';
import { ScoreCreateDto } from './dto/score.create.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @ApiOperation({ summary: 'score 추가' })
  @UseGuards(JwtAuthGuard)
  @Post()
  createScore(@CurrentUser() user: User, @Body() data: ScoreCreateDto) {
    return this.scoreService.createScore(user, data);
  }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Asia/Seoul' })
  @ApiOperation({ summary: 'score 추가- 스케쥴' })
  @Post('schedule')
  createScoreScheduled() {
    return this.scoreService.createScoreScheduled();
  }

  //
  // @Cron(CronExpression.EVERY_5_SECONDS, { timeZone: 'Asia/Seoul' })
  @ApiOperation({ summary: 'score 모두 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllScores(@CurrentUser() user: User) {
    return this.scoreService.getAllScores(user);
  }

  @ApiOperation({ summary: '그래프 그리기 위한 score자료 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('graph')
  getGraphScore(@CurrentUser() user: User) {
    return this.scoreService.getGraphScore(user);
  }

  @ApiOperation({ summary: 'score 필터링' })
  @UseGuards(JwtAuthGuard)
  @Get('graph1')
  getScoreByQuery(
    @CurrentUser() user: User,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return this.scoreService.getScoreByQuery(user, startDate, endDate);
  }
}
