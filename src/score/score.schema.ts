import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
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

  //   readonly graphData: {
  //     score: number;
  //     timestamps : Date;

  //   };
}
export const ScoreSchema = SchemaFactory.createForClass(Score);

// ScoreSchema.virtual('readOnlyData').get(function (this: Score) {
//   return {
//     category: this.category,
//     contents: this.contents,
//   };
// });
