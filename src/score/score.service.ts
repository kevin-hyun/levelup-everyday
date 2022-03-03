import { UsersRepository } from './../users/users.repository';
import { GoalsRepository } from './../goals/goals.repository';
import { ScoreCreateDto } from './dto/score.create.dto';
import { User } from './../users/users.schema';
import { ScoreRepository } from './score.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly goalsRepository: GoalsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createScore(user: User, data: ScoreCreateDto) {}
}
