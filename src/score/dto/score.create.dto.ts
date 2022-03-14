import { ApiProperty, PickType } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class ScoreCreateDto {
  @ApiProperty({
    example: ['621f3fdd98a6e6a99dc2a0f1', '621f3fdd98a6e6a99dc2a0f1'],
    description: '완료한 골들의 id',
    required: true,
  })
  goalsArray: Array<string> | Array<Types.ObjectId>;
}

// export class ScoresDBInsertDto extends PickType(Score, [])
