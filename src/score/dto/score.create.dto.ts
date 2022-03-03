import { ApiProperty, PickType } from '@nestjs/swagger';
import { Score } from './../score.schema';

export class ScoreCreateDto {
  @ApiProperty({
    example: '2022-03-02T09:58:53.028Z',
    description: '골 완료 제출 시각',
    required: true,
  })
  date: Date;

  @ApiProperty({
    example: ['621f3fdd98a6e6a99dc2a0f1', '621f3fdd98a6e6a99dc2a0f1'],
    description: '완료한 골들의 id',
    required: true,
  })
  goalsArray: Array<string>;
}

// export class ScoresDBInsertDto extends PickType(Score, [])
