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

  async createScore(user: User, data: ScoreCreateDto) {
    const { date, goalsArray } = data;

    // conntinuous logic
    // this.scoreRepository.getScoreDateBetween(date, date);

    const isContinuos = false;

    const updatedUser = await this.usersRepository.findUserAndUpdateContinuity(
      user.id.toString(),
      isContinuos,
    );
    const goalScore = new Object();

    // for (const goal of goalsArray) {
    //   const score = await this.scoreRepository.findScoreByGoalId(goal)
    //   console.log(goal);
    const result = updatedUser._id.getTimestamp();
    const result_minus = new Date(result - 1000 * 3600 * 24);

    console.log(result);
    console.log(result_minus);
    // const dateStart = '2022-03-02T09:58:53';
    // const dateEnd = '2022-03-03T00:00:00';

    return this.scoreRepository.getScoreDateBetween(result_minus, result);
    return '1';

    // const score = 10 + 0.1*updatedUser.continuity

    // return await this.scoreRepository.create(score);
  }
}
