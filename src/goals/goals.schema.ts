import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions, Types } from 'mongoose';
const options: SchemaOptions = {
  timestamps: true,
  collection: 'goal',
};

@Schema(options)
export class Goals extends Document {
  @ApiProperty({
    example: '612131asdajsdl12',
    description: 'user id',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'users',
  })
  @IsNotEmpty()
  author: Types.ObjectId;

  @ApiProperty({
    example: '습관 들이기',
    description: '아침 6시 기상',
    required: true,
  })
  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: 'category',
  })
  @IsString()
  @IsNotEmpty()
  category: Types.ObjectId;

  @ApiProperty({
    example: '6시에 기상하기',
    description: '목표 이름 ',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  contents: string;

  readonly readOnlyData: {
    category: string;
    contents: string;
  };
}
export const GoalsSchema = SchemaFactory.createForClass(Goals);

GoalsSchema.virtual('readOnlyData').get(function (this: Goals) {
  return {
    category: this.category,
    contents: this.contents,
  };
});
