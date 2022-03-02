import { Category } from './../category.schema';
import { PickType } from '@nestjs/swagger';
export class CategoryCreateDto extends PickType(Category, ['name'] as const) {}
