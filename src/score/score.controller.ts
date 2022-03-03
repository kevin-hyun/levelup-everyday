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
}
