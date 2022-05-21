import { Goals } from './../goals.schema';
import { PickType } from '@nestjs/swagger';

export class GoalsUpdateDto extends PickType(Goals, [
  'category',
  'contents',
  'softDelete',
] as const) {}
