import { ScoreReadBtwParamsDto } from './score.read.btw.dto';
import { Types } from 'mongoose';
import { PickType } from '@nestjs/swagger';

export class ScoreReadDateStartParamsDto extends PickType(
  ScoreReadBtwParamsDto,
  ['startDate'] as const,
) {}
