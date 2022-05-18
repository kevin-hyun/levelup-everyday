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
  const [chartType, setChartType] = useState('line');

  useLayoutEffect(() => {
    let chart = am4core.create('chartdiv', am4charts.XYChart);
    // Increase contrast by taking evey second color
    chart.colors.step = 2;

    chart.paddingRight = 20;
    chart.dateFormatter.dateFormat = 'yyyy-MM-dd';

    let data = [
      {
        date: '2022-05-11',
        '아주아주 긴 텍스트1': 10,
        obj2: 0,
        obj3: 13,
        accum: 23,
      },
      {
        date: '2022-05-12',
        '아주아주 긴 텍스트1': 0,
        obj2: 10,
        obj3: 13,
        accum: 46,
      },
      {
        date: '2022-05-13',
        '아주아주 긴 텍스트1': 0,
        obj2: 0,
        obj3: 0,
        accum: 46,
      },
      {
        date: '2022-05-14',
        '아주아주 긴 텍스트1': 0,
        obj2: 10,
        obj3: 13,
        accum: 69,
      },
    ];

    // for (let i = 0; i < obj.length; i++) {
    //   data.push({
    //     date: obj[i]['date'],
    //     name: 'name' + i,
    //     value: obj[i]['obj2'],
    //   });
    // }

    chart.data = data;

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
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

      series.smoothing = 'monotoneX';

      var bullet = series.bullets.push(new am4charts.CircleBullet());
      bullet.circle.stroke = am4core.color('#fff');
      bullet.circle.strokeWidth = 2;

      return series;
    }

    createSeries('아주아주 긴 텍스트1', '아주아주 긴 텍스트1');
    createSeries('obj2', 'Obj2');
    createSeries('obj3', 'Obj3');
    createSeries('accum', '누적점수');

    chart.legend = new am4charts.Legend();
    chart.cursor = new am4charts.XYCursor();

    // let series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = 'date';
    // series.dataFields.valueY = 'value';
    // series.tooltipText = '{valueY.value}';
    // chart.cursor = new am4charts.XYCursor();

    // * 위쪽에 보이는 전체 그래프
    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    chart.current = chart;

    return () => {
      chart.dispose();
    };
  }, [dates]);

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
  console.log(score);

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
