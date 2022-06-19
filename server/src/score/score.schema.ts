import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as moment from 'moment';
const dateSeoul = moment().format();

const options: SchemaOptions = {
  timestamps: true,
  collection: 'score',
};

@Schema(options)
export class Score extends Document {
  @ApiProperty({
    example: 10,
    description: 'score',
    required: true,
  })
  @Prop({
    required: true,
    default: 100,
  })
  @IsNotEmpty()
  score: number;

  @ApiProperty({
    example: '6cssfaj12340198asd',
    description: 'goalId',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'goal',
  })
  @IsString()
  @IsNotEmpty()
  goal: Types.ObjectId;

  @ApiProperty({
    example: '6cssfaj12340198asd',
    description: 'userId',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsString()
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    example: '2022-03-14T23:56:43+09:00',
    description: 'createdAt',
    required: true,
  })
  @Prop({
    type: String,
    required: false,
    default: dateSeoul,
  })
  @IsDate()
  @IsNotEmpty()
  createdAt: string;

  @ApiProperty({
    example: '2022-03-14T23:56:43+09:00',
    description: 'updatedAt',
    required: true,
  })
  @Prop({
    type: String,
    required: false,
    default: dateSeoul,
  })
  @IsDate()
  @IsNotEmpty()
  updatedAt: string;
}
export const ScoreSchema = SchemaFactory.createForClass(Score);
