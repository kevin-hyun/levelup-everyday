import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users.schema';

export class UsersCreateDto extends User {
  @ApiProperty({
    example: 'password123!.com',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
