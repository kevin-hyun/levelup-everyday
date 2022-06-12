import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreReadBtwParamsDto {
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
