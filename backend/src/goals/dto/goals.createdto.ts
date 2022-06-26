import { Goals } from '../goals.schema';
import { PickType } from '@nestjs/swagger';

export class GoalsCreateDto extends PickType(Goals, [
  'category',
  'contents',
] as const) {}

export class GoalsDBInsertDto extends PickType(Goals, [
  'author',
  'category',
  'contents',
  'softDelete',
] as const) {}
