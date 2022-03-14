import { ApiProperty, PickType } from '@nestjs/swagger';
import { Score } from '../score.schema';

export class ScoreInsertDto extends PickType(Score, [
  'score',
  'author',
  'goal',
] as const) {}
