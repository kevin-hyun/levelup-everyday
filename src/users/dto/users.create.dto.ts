import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users.schema';

export class UsersCreateDto extends PickType(User, [
  'email',
  'password',
  'name',
  'role',
  'imgUrl',
] as const) {
  @ApiProperty({
    example: 'password123!',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;
}
