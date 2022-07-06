import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import {
  ScoreContainer,
  ScoreContent,
  ScoreCircle,
  ScoreContinuity,
  ScoreCalc,
  GraphInfo,
  ScoreText,
  ScoreWrapper,
  GraphContainer,
} from "./ScoreElement";

import Graph from "../Graph/index";
import AuthContext from "../../store/auth-context";
import GoalContext from "../../store/goal-context";

const Score = (props) => {
  const authCtx = useContext(AuthContext);
  const goalCtx = useContext(GoalContext);
  const [score, setScore] = useState([]);
  const [scoreTotal, setScoreTotal] = useState(0);

  const [scoreAccum, setScoreAccum] = useState([]);
  const [dates, setDates] = useState([]);
  const [accumData, setAccumData] = useState({
    labels: ["label1", "label2"],
    datasets: [{ label: "label1", data: [1, 2] }],
  });
  const [continuity, setContinuity] = useState(0);

  const [graphData, setGraphData] = useState([]);
  const [lineData, setLineData] = useState({
    labels: ["label1", "label2"],
    datasets: [{ label: "label1", data: [1, 2] }],
  });

  useEffect(() => {
    console.log("score-useEffect");
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

  useEffect(() => {
    if (graphData.length !== 0) {
      lineChartConfig(graphData);
    }
  }, [graphData]);

  useEffect(() => {
    if (dates.length !== 0) {
      accumChartConfig(dates, scoreAccum);
    }
  }, [dates]);

  const getAllScore = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
      .get(
        "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:5000/api/score",
        config
      )
      .then((response) => {
        if (response.data.success) {
          setScore(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
      });
  };

  const getGraphData = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
      .get(
        "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:5000/api/score/graph",
        config
      )
      .then((response) => {
        if (response.data.success) {
          setGraphData(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
      });
  };

  const accumChartConfig = (label, data) => {
    const color = "#8080ff";

    const dateFormat = label.map((date) => {
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const result = `${month}-${day}`;
      return result;
    });

    let obj = {};
    obj["label"] = "누적점수";
    obj["data"] = data;
    obj["backgroundColor"] = [color];
    obj["borderColor"] = [color];

    const result = { labels: dateFormat, datasets: [obj] };

    setAccumData(result);
  };

  const lineChartConfig = (data) => {
    const color = ["#ffeba8", "#FFFB8C", "#bae9f7", "#b2d2f7", "#a3baf0"];
    const dataSet = data.datasets;

    for (let e of dataSet) {
      let obj = {
        ...e,
      };
      obj["backgroundColor"] = [color[dataSet.indexOf(e)]];
      obj["borderColor"] = [color[dataSet.indexOf(e)]];
      obj["lineTension"] = 0.5;
      dataSet[dataSet.indexOf(e)] = obj;
    }

    const dateFormat = data.labels.map((date) => {
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const result = `${month}-${day}`;
      return result;
    });

    let result = { labels: dateFormat, datasets: dataSet };

    setLineData(result);
  };

  const calcScore = (score) => {
    let scoreAccumArray = [];
    let dateArray = [];
    let sum = 0;
    for (const element of score) {
      sum += element.score;
      scoreAccumArray.push(sum);
      dateArray.push(element.createdAt.slice(0, 10));
    }

    const newScore = [];
    const newDate = [];

    dateArray.forEach((value, index) => {
      if (index % goalCtx.goals.length === 2) {
        newScore.push(scoreAccumArray[index]);
        newDate.push(value);
      }
    });

    setScoreAccum(newScore);
    setDates(newDate);
    setScoreTotal(sum);
  };

  const getContinuity = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };
    axios
      .get(
        "http://ec2-52-78-79-223.ap-northeast-2.compute.amazonaws.com:5000/api/users",
        config
      )
      .then((response) => {
        if (response.data.success) {
          setContinuity(response.data.data.continuity);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
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
          {/* {console.log('score 렌더링')} */}
          <GraphInfo>당일 이전의 그래프까지 확인 가능합니다.</GraphInfo>
          {graphData.length === 0 ? (
            <p>로딩중....</p>
          ) : (
            <Graph accumData={accumData} lineData={lineData}></Graph>
          )}
        </GraphContainer>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
