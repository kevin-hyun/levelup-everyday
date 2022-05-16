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
  ScoreText,
  ScoreWrapper,
  GraphContainer,
} from './ScoreElement';

import Graph from '../Graph/index';
import AuthContext from '../../store/auth-context';

am4core.useTheme(am4themes_animated);

const Score = (props) => {
  const chart = useRef(null);

  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState([]);
  const [scoreTotal, setScoreTotal] = useState(0);
  const [scoreAccum, setScoreAccum] = useState([]);
  const [dates, setDates] = useState([]);
  const [continuity, setContinuity] = useState(0);

  useLayoutEffect(() => {
    let x = am4core.create('chartdiv', am4charts.XYChart);

    x.paddingRight = 20;

    let data = [];

    // for (let i = 0; i < 10; i++) {
    //   // visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   visits += i;
    //   data.push({
    //     date: new Date(`2018-10-${i}`),
    //     name: 'name' + i,
    //     value: visits,
    //   });
    // }

    for (let i = 0; i < dates.length; i++) {
      data.push({
        date: dates[i],
        name: 'name' + i,
        value: scoreAccum[i],
      });
    }

    x.data = data;

    let dateAxis = x.xAxes.push(new am4charts.DateAxis());
    dateAxis.dateFormatter = new am4core.DateFormatter();
    dateAxis.dateFormatter.dateFormat = 'MM-dd';
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.title.text = '날짜';

    let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.minWidth = 35;

    let series = x.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = 'value';
    series.tooltipText = '{valueY.value}';
    x.cursor = new am4charts.XYCursor();

    // * 위쪽에 보이는 전체 그래프
    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    x.scrollbarX = scrollbarX;

    chart.current = x;

    return () => {
      x.dispose();
    };
  }, [dates]);

  useEffect(() => {
    getAllScore();
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
  console.log(scoreAccum);
  console.log(dates);

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
          <div id="chartdiv" style={{ width: '700px', height: '500px' }}></div>
        </GraphContainer>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
