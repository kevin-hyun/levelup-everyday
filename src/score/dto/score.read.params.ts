import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreReadParamsDto {
  @ApiProperty({
    example: '621f3e6d75db55964d53b1dd',
    description: '유저 아이디',
    required: true,
  })
  userId: Types.ObjectId;

  @ApiProperty({
    example: '2022 - 03 - 02',
    description: '조회 시작 날짜',
    required: true,
  })
  startDate: string;

  @ApiProperty({
    example: '2022 - 03 - 10',
    description: '조회 끝 날짜',
    required: true,
  })
  endDate: string;
}
