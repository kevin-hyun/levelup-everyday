import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';

const options: SchemaOptions = {
  timestamps: true,
  collection: 'category',
};

@Schema(options)
export class Category extends Document {
  @ApiProperty({
    example: '건강관리',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
    unique: true,
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'test_admin@gmail.com',
    description: 'author',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  author: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
