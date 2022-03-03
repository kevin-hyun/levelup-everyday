import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class User extends Document {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password123!.com',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Prop()
  password: string;

  @ApiProperty({
    example: 'david',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Prop({
    default: 0,
  })
  role: number;

  @ApiProperty({
    example: 'imgUrl',
    description: 'imgUrl',
    required: false,
  })
  @Prop({
    default:
      'https://cdn0.iconfinder.com/data/icons/ui-essence/32/_68ui-256.png',
  })
  imgUrl: string;

  @ApiProperty({
    example: 3,
    description: '연속 횟수',
    required: true,
  })
  @Prop({
    default: 0,
  })
  continuity: number;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    role: number;
    imgUrl: string;
  };
  readonly adminData: {
    id: string;
    email: string;
    name: string;
    role: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('readOnlyData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    role: this.role,
    imgUrl: this.imgUrl,
  };
});

UserSchema.virtual('adminData').get(function (this: User) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    role: this.role,
  };
});
