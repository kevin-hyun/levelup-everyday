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
  const [graphData, setGraphData] = useState([]);
  const [scoreAccum, setScoreAccum] = useState([]);
  const [dates, setDates] = useState([]);
  const [continuity, setContinuity] = useState(0);

  useLayoutEffect(() => {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    chart.paddingRight = 20;
    chart.dateFormatter.dateFormat = 'yyyy-MM-dd';

    const data = graphData;

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.groupData = true;
    dateAxis.renderer.grid.template.location = 0;
    // dateAxis.title.text = '날짜';

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = false;
    valueAxis.renderer.minWidth = 35;

    // Create series
    function createSeries(field, name) {
      var series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.valueY = field;
      series.dataFields.dateX = 'date';
      series.name = name;
      series.tooltipText = '{name}: [b]{valueY}[/]';
      series.strokeWidth = 2;

      // series.smoothing = 'monotoneX';

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 2;

      // * 위쪽에 보이는 전체 그래프
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

      return series;
    }

    const lstData = graphData[graphData.length - 1];
    const keyArr = Object.keys(lstData);

    for (let i = 1; i < keyArr.length; i++) {
      createSeries(keyArr[i], keyArr[i]);
    }

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [graphData]);

  // //PieChaet
  // useLayoutEffect(() => {
  //   let chart = am4core.create('piediv', am4charts.PieChart);
  //   // Increase contrast by taking evey second color
  //   //state로 점수/ 횟수 변환

  //   // Add data
  //   chart.data = [
  //     {
  //       country: 'Lithuania',
  //       litres: 501.9,
  //     },
  //     {
  //       country: 'Czech Republic',
  //       litres: 301.9,
  //     },
  //     {
  //       country: 'Ireland',
  //       litres: 201.1,
  //     },
  //     {
  //       country: 'Germany',
  //       litres: 165.8,
  //     },
  //     {
  //       country: 'Australia',
  //       litres: 139.9,
  //     },
  //     {
  //       country: 'Austria',
  //       litres: 128.3,
  //     },
  //     {
  //       country: 'UK',
  //       litres: 99,
  //     },
  //     {
  //       country: 'Belgium',
  //       litres: 60,
  //     },
  //     {
  //       country: 'The Netherlands',
  //       litres: 50,
  //     },
  //   ];

  //   // Add and configure Series
  //   let pieSeries = chart.series.push(new am4charts.PieSeries());
  //   pieSeries.dataFields.value = 'litres';
  //   pieSeries.dataFields.category = 'country';

  //   return () => {
  //     chart.dispose();
  //   };
  // }, [dates]);

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
          <div id="chartdiv" style={{ width: '800px', height: '500px' }}></div>
          {/* <div id="piediv" style={{ width: '800px', height: '500px' }}></div> */}
        </GraphContainer>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
