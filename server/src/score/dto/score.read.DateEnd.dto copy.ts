import { ScoreReadBtwParamsDto } from './score.read.btw.dto';
import { Types } from 'mongoose';
import { PickType } from '@nestjs/swagger';

export class ScoreReadDateEndParamsDto extends PickType(ScoreReadBtwParamsDto, [
  'endDate',
] as const) {}
