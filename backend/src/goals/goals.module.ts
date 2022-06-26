import { CategoryModule } from '../category/category.module';
import { Goals, GoalsSchema } from './goals.schema';
import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsRepository } from './goals.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Goals.name, schema: GoalsSchema }]),
    CategoryModule,
  ],
  controllers: [GoalsController],
  providers: [GoalsService, GoalsRepository],
  exports: [GoalsService, GoalsRepository],
})
export class GoalsModule {}
