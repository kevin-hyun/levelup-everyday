import { ApiProperty, PickType } from '@nestjs/swagger';
import { Score } from '../score.schema';

export class ScoreUpdateDto extends PickType(Score, [
  'goal',
  'score',
] as const) {}
