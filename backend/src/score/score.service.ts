import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import mongoose from 'mongoose';

import { UsersRepository } from '../users/users.repository';
import { GoalsRepository } from '../goals/goals.repository';
import { ScoreCreateDto } from './dto/score.create.dto';
import { User } from '../users/users.schema';
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

  async createScoreScheduled() {
    const dateBefore = moment().subtract(1, 'day').format('YYYY-MM-DD');
    const dateSeoul = moment().format('YYYY-MM-DD');

    const data = {
      startDate: dateBefore,
      endDate: dateSeoul,
    };

    const getScoreBefore = await this.scoreRepository.getScoreBetweenDate(data);

    //* 유저 연속성 업데이트
    let userSubmitted = getScoreBefore.map((score) => {
      return score['author'].toString(); //mongoose typeId -> new로 새로 정의됌 - 고유한 값으로 인식
    });
    userSubmitted = [...new Set(userSubmitted)];

    const users = await this.usersRepository.getAllUserId();
    for (const user of users) {
      if (userSubmitted.includes(user['_id'].toString())) {
        await this.usersRepository.findUserAndUpdateContinuity(
          user['id'].toString(),
          true,
        );
      } else {
        await this.usersRepository.findUserAndUpdateContinuity(
          user['id'].toString(),
          false,
        );
      }
    }

    //* 빈 점수 생성
    const goalSubmitted = getScoreBefore.map((score) => {
      return score['goal'].toString();
    });
    const goals = await this.goalsRepository.getExcludedGoals(goalSubmitted);
    console.log(goalSubmitted);
    console.log(goals);

    for (const goal of goals) {
      const insertData = {
        score: 0,
        author: new mongoose.Types.ObjectId(goal['author']),
        goal: new mongoose.Types.ObjectId(goal['_id']),
        updatedAt: moment().subtract(1, 'day').format(),
        createdAt: moment().subtract(1, 'day').format(),
      };
      try {
        await this.scoreRepository.InsertData(insertData);
      } catch (err) {
        console.log(err);
      }
    }

    return 1;
  }

  async getAllScores(user: User) {
    const userId = user._id;
    console.log(userId);
    return await this.scoreRepository.getAllScore(userId);
  }

  async getGraphScore(user: User) {
    const userId = user._id;
    const dataEnd = {
      startDate: moment('2022-01-01').startOf('day').format(),
      endDate: moment().subtract(1, 'day').endOf('day').format(),
    };
    const scores = await this.scoreRepository.getScoreEndDate(userId, dataEnd);

    const makeGraphData = async (scoreData) => {
      const goals = await this.goalsRepository.getAllGoals(userId);

      const goalObj = {};
      for (const goal of goals) {
        goalObj[goal._id] = goal.contents;
      }
      const data = scoreData.map((data) => {
        const obj = {
          date: data.updatedAt.slice(0, 10),
          goal: goalObj[data.goal],
          score: data.score,
        };
        return obj;
      });
      const groupedData = groupBy(data, 'date');

      const result = [];

      let id = 0;

      for (const key in groupedData) {
        const value = groupedData[key];
        const obj = {};
        obj['id'] = id;
        id += 1;
        obj['date'] = key;
        let accum = 0;
        for (const e of value) {
          obj[e.goal] = e.score;
          accum += e.score;
        }
        obj['total'] = accum;
        result.push(obj);
      }

      const labels = result.map((data) => data.date);

      const dataSet = goals.map((goal) => {
        const obj = {};
        const title = goal.contents;

        obj['label'] = title;
        obj['data'] = result.map((score) => score[title]);
        return obj;
      });
      const dataSets = {
        labels,
        datasets: dataSet,
      };

      return dataSets;
    };

    const data = makeGraphData(scores);

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
