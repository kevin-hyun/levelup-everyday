import { UsersRepository } from './../users/users.repository';
import { GoalsRepository } from './../goals/goals.repository';
import { ScoreCreateDto } from './dto/score.create.dto';
import { User } from './../users/users.schema';
import { ScoreRepository } from './score.repository';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

const dateSeoul = moment().format('YYYY-MM-DD');
const timeSeoul = moment().format();
const dateBefore = moment().subtract(1, 'day').format('YYYY-MM-DD');

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly goalsRepository: GoalsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createScore(user: User, data: ScoreCreateDto) {
    const comboWeight = 3;
    let continuity = 0;
    const userId = user._id;

    const prevScore = await this.scoreRepository.getScoreData(userId);

    //previous data check

    if (prevScore.length === 0) {
      const user = await this.usersRepository.findUserAndUpdateContinuity(
        userId,
        false,
      );
      continuity = user.continuity;
    } else {
      //자료 있음
      //continuity check
      const lastUpdatedDate = prevScore[prevScore.length - 1][
        'updatedAt'
      ].slice(0, 10);

      //다른날짜 업데이트
      if (lastUpdatedDate !== dateSeoul) {
        if (lastUpdatedDate !== dateBefore) {
          // 하루이상 차이
          const user = await this.usersRepository.findUserAndUpdateContinuity(
            userId,
            false,
          );
          continuity = user.continuity;
        } else {
          // 하루 차이 - 연속
          const user = await this.usersRepository.findUserAndUpdateContinuity(
            userId,
            true,
          );
          continuity = user.continuity;
        }
      }
    }

    //data insert
    let result = new Object();

    try {
      for (const el of data['goalsArray']) {
        const goal = await this.goalsRepository.getGoal(el);
        const goalId = goal['_id'];
        console.log(continuity);
        const data = {
          score: 10 + continuity * comboWeight,
          author: userId,
          goal: goalId,
          updatedAt: moment().format(),
          createdAt: moment().format(),
        };
        result = await this.scoreRepository.InsertData(data);
      }
    } catch (err) {
      console.log(err);
    }

    return result;
    // return 1;
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

    return this.scoreRepository.getScoreBetweenDate(data);
  }
}
