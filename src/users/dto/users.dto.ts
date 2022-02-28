import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../users.schema';

export class ReadOnlyUserDto extends PickType(User, [
  'email',
  'name',
  'role',
  'imgUrl',
]) {
  @ApiProperty({
    example: '3201230',
    description: 'id',
    required: true,
  })
  id: string;
}
