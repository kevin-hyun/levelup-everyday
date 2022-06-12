import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import mongoose from 'mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';

import { UsersRepository } from './../users/users.repository';
import { GoalsRepository } from './../goals/goals.repository';
import { ScoreCreateDto } from './dto/score.create.dto';
import { User } from './../users/users.schema';
import { ScoreRepository } from './score.repository';
import { groupBy } from '../common/utils/groupby';

@Injectable()
export class ScoreService {
  constructor(
    private readonly scoreRepository: ScoreRepository,
    private readonly goalsRepository: GoalsRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async createScore(user: User, data: ScoreCreateDto) {
    const comboWeight = 3;
    const userId = user._id;
    const continuity = user.continuity;
    const goals = data;
    console.log(typeof data);

    const insertData = goals.goalsArray.map((goal) => {
      const obj = {
        score: 10 + comboWeight * continuity,
        author: userId,
        goal: new mongoose.Types.ObjectId(goal),
        updatedAt: moment().format(),
        createdAt: moment().format(),
      };
      return obj;
    });

    try {
      const result = await this.scoreRepository.InsertManyData(insertData);
      return result;
    } catch (err) {
      console.log(err);
    }

    return insertData;
  }

  // async createScoreScheduled() {
  //   const dateBefore = moment().subtract(1, 'day').format('YYYY-MM-DD');
  //   const dateSeoul = moment().format('YYYY-MM-DD');

  //   const scoreReadDto = {
  //     userId,
  //     startDate: dateBefore,
  //     endDate: dateSeoul,
  //   };
  //   const prevScore = await this.scoreRepository.getScoreBetweenDate(
  //     scoreReadDto,
  //   );

  //   const goals = await this.goalsRepository.getAllGoals(userId);
  //   const goalsList = goals.map((goal) => {
  //     return goal._id.toString();
  //   });

  //   // previous data check
  //   // 하루 목표 10점 이상 없음 - 다 0 점
  //   if (prevScore.length === 0) {
  //     //연속 점수 업데이트 - 0 reset
  //     const user = await this.usersRepository.findUserAndUpdateContinuity(
  //       userId,
  //       false,
  //     );

  //     //data 삽입
  //     const insertData = goals.map((goal) => {
  //       const obj = {
  //         score: 0,
  //         author: userId,
  //         goal: goal.id,
  //         updatedAt: moment().subtract(1, 'day').format(),
  //         createdAt: moment().subtract(1, 'day').format(),
  //       };
  //       return obj;
  //     });

  //     try {
  //       const result = await this.scoreRepository.InsertManyData(insertData);
  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     //자료 있음
  //     //continuity check
  //     //연속 점수 업데이트 - 0 reset
  //     const user = await this.usersRepository.findUserAndUpdateContinuity(
  //       userId,
  //       true,
  //     );

  //     // 제출하지 않은 score 골 확인
  //     const completedGoal = prevScore.map((score) => {
  //       return score.goal.toString();
  //     });

  //     const difference = goalsList.filter((x) => !completedGoal.includes(x));

  //     const insertData = difference.map((goal) => {
  //       const obj = {
  //         score: 0,
  //         author: userId,
  //         goal: new mongoose.Types.ObjectId(goal),
  //         updatedAt: moment().subtract(1, 'day').format(),
  //         createdAt: moment().subtract(1, 'day').format(),
  //       };
  //       return obj;
  //     });

  //     try {
  //       const result = await this.scoreRepository.InsertManyData(insertData);
  //       console.log(result);
  //       return result;
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }

  //   return 1;
  // }

  async getAllScores(user: User) {
    const userId = user._id;
    console.log(userId);
    return await this.scoreRepository.getAllScore(userId);
  }

  async getGraphScore(user: User) {
    const userId = user._id;
    const scores = await this.scoreRepository.getScoreData(userId);

    const makeGraphData = (scoreData) => {
      const data = scoreData.map((data) => {
        const obj = {
          date: data.updatedAt.slice(0, 10),
          goal: data.goal.contents,
          score: data.score,
        };
        return obj;
      });
      const groupedData = groupBy(data, 'date');

      const result = [];

      for (const key in groupedData) {
        const value = groupedData[key];
        const obj = {};
        obj['date'] = key;
        for (const e of value) {
          obj[e.goal] = e.score;
        }
        result.push(obj);

        // Use `key` and `value`
      }

      return result;
    };

    const data = makeGraphData(scores);

    // const makeGraphData = (scoreData) => {
    //   const data = scoreData.map((data) => {
    //     const obj = {
    //       date: data.updatedAt.slice(0, 10),
    //       goal: data.goal.contents,
    //       score: data.score,
    //     };
    //     return obj;
    //   });
    //   const groupedData = groupBy(data, 'date');
    //   const result = new Array();
    //   for (let [key, value] of Object.entries(groupedData)) {
    //     const obj = new Object();
    //     obj['date'] = key;
    //     for (const e of value) {
    //       obj[e.goal] = e.score;
    //     }
    //     result.push(obj);

    //     return result;
    //   }

    // };
    // return scores;

    return data;
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
