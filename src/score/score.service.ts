import { UsersRepository } from './../users/users.repository';
import { GoalsRepository } from './../goals/goals.repository';
import { ScoreCreateDto } from './dto/score.create.dto';
import { User } from './../users/users.schema';
import { ScoreRepository } from './score.repository';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

const dateSeoul = moment().format('YYYY-MM-DD');
const dayBefore = moment().subtract(1, 'day').format('YYYY-MM-DD');

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly goalsRepository: GoalsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createScore(user: User, data: ScoreCreateDto) {
    const comboWeight = 10;
    let continuity = 0;
    const userId = user._id;

    const prevScore = await this.scoreRepository.getScoreLastData(userId);

    //previous data check
    //기존 자료 없음
    if (prevScore.length === 0) {
      const user = await this.usersRepository.findUserAndUpdateContinuity(
        userId,
        false,
      );
      continuity = user.continuity;
    } else {
      //continuity check
      const lastUpdatedDate = prevScore[0]['createdAt'];
      //같은날짜 업데이트
      if (lastUpdatedDate === dateSeoul) {
      } else if (lastUpdatedDate !== dayBefore) {
        // 하루이상 차이
        const user = await this.usersRepository.findUserAndUpdateContinuity(
          userId,
          false,
        );
        continuity = user.continuity;
      } else if (lastUpdatedDate === dayBefore) {
        // 하루 차이 - 연속
        const user = await this.usersRepository.findUserAndUpdateContinuity(
          userId,
          true,
        );
        continuity = user.continuity;
      }
    }

    //data insert

    try {
      for (const el of data['goalsArray']) {
        const goal = await this.goalsRepository.getGoal(el);
        const goalId = goal['_id'];
        const data = {
          score: 100 + continuity * comboWeight,
          author: userId,
          goal: goalId,
        };
        await this.scoreRepository.InsertData(data);
      }
    } catch (err) {
      console.log(err);
    }

    return 1;
  }

  async getAllScores(user: User) {
    const userId = user._id;
    return await this.scoreRepository.getAllScore(userId);
  }

  async getScoreByQuery(user: User, startDate: string, endDate: string) {
    const userId = user._id;
    const data = {
      userId,
      startDate,
      endDate,
    };
    console.log(data);
    return this.scoreRepository.getScoreBetweenDate(data);
  }
}
