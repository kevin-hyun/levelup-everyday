import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import axios from 'axios';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

import {
  ScoreContainer,
  ScoreContent,
  ScoreCircle,
  ScoreContinuity,
  ScoreCalc,
  GraphButton,
  GraphInfo,
  ScoreText,
  ScoreWrapper,
  GraphContainer,
} from './ScoreElement';

import Graph from '../Graph/index';
import AuthContext from '../../store/auth-context';
import GoalContext from '../../store/goal-context';

am4core.useTheme(am4themes_animated);

const Score = (props) => {
  const chart = useRef(null);

  const authCtx = useContext(AuthContext);
  const goalCtx = useContext(GoalContext);
  const [score, setScore] = useState([]);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [graphData, setGraphData] = useState([]);
  const [scoreAccum, setScoreAccum] = useState([]);
  const [dates, setDates] = useState([]);
  const [continuity, setContinuity] = useState(0);
  const [userData, setUserData] = useState({});
  // const [userData, setUserData] = useState({});

  // console.log(goalCtx.goals);
  // console.log(graphData);
  console.log(userData);

  useEffect(() => {
    getAllScore();
    getGraphData();
  }, []);

  useEffect(() => {
    if (!!score) {
      calcScore(score);
      getContinuity();
    } else {
      setScoreAccum(0);
    }
    return () => {};
  }, [score]);

  const getAllScore = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
      .get('http://localhost:5000/score', config)
      .then((response) => {
        if (response.data.success) {
          setScore(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  const getGraphData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
      .get('http://localhost:5000/score/graph', config)
      .then((response) => {
        if (response.data.success) {
          setGraphData(response.data.data);
          const labels = graphData.map((data) => data.date);
          console.log(labels);
          console.log(goalCtx.goals);
          const color = ['#8080ff', '#ffff80', '#101021'];
          const datasets = goalCtx.goals.map((goal) => {
            const obj = {};
            const title = goal.contents;
            console.log(title);

            obj['label'] = title;
            obj['data'] = graphData.map((score) => score[title]);
            obj['backgroundColor'] = color[0];
            return obj;
          });
          const dataSet = {
            labels,
            datasets,
          };
          setUserData(dataSet);
          console.log(userData);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  const calcScore = (score) => {
    let scoreAccumArray = [];
    let dateArray = [];
    let sum = 0;
    for (const element of score) {
      sum += element.score;
      scoreAccumArray.push(sum);
      dateArray.push(element.createdAt);
    }
    setScoreAccum(scoreAccumArray);
    setDates(dateArray);
    setScoreTotal(sum);
  };

  const getContinuity = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };
    axios
      .get('http://localhost:5000/users', config)
      .then((response) => {
        if (response.data.success) {
          setContinuity(response.data.data.continuity);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  return (
    <ScoreContainer>
      <ScoreContent>
        <ScoreCircle>
          <ScoreWrapper>
            <ScoreContinuity>
              {continuity}
              <ScoreText>일 연속</ScoreText>
            </ScoreContinuity>
            <ScoreText>성장 점수</ScoreText>
            <ScoreCalc>{scoreTotal}</ScoreCalc>
          </ScoreWrapper>
        </ScoreCircle>
        <GraphContainer>
          <GraphInfo>당일 이전의 그래프까지 확인 가능합니다.</GraphInfo>
          <Graph chartData={userData}></Graph>
        </GraphContainer>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
