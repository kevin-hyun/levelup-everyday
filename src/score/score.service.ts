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
    const comboWeight = 10;
    let continuity = 0;
    const userId = user._id;

    //previous data check
    const prevScore = await this.scoreRepository.getScoreLastData(userId);
    console.log(prevScore);
    if (prevScore.length === 0) {
      const user = await this.usersRepository.findUserAndUpdateContinuity(
        userId,
        false,
      );
      continuity = user.continuity;
    } else {
      //continuity check
      const lastUpdatedDate = new Date(prevScore[0]['createdAt']);
      lastUpdatedDate.setHours(lastUpdatedDate.getHours() + 9);
      const nowUTC = new Date();
      nowUTC.setHours(nowUTC.getHours() + 9);
      const dateDiff = nowUTC.getTime() - lastUpdatedDate.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      // const sameDay = lastUpdatedDate.getDate() === nowUTC.getDate()

      if (dateDiff > oneDay) {
        const user = await this.usersRepository.findUserAndUpdateContinuity(
          userId,
          false,
        );
        continuity = user.continuity;
      } else {
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
        console.log(continuity);
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
    const timeZone = 1000 * 60 * 60 * 9;
    const oneDay = 1000 * 60 * 60 * 24;
    const startDateTimezone = new Date(
      new Date(startDate).getTime() - timeZone,
    );
    const endDateTimezone = new Date(
      new Date(endDate).getTime() + oneDay - timeZone,
    );

    const data = {
      userId,
      startDate: startDateTimezone,
      endDate: endDateTimezone,
    };
    console.log(data);
    return this.scoreRepository.getScoreBetweenDate(data);
  }
}
