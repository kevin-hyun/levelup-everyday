import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import axios from "axios";

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
} from "./ScoreElement";

import Graph from "../Graph/index";
import AuthContext from "../../store/auth-context";
import GoalContext from "../../store/goal-context";
import { groupBy } from "../utils/groupby";

const Score = (props) => {
  const authCtx = useContext(AuthContext);
  const goalCtx = useContext(GoalContext);
  const [score, setScore] = useState([]);
  const [scoreTotal, setScoreTotal] = useState(0);

  const [scoreAccum, setScoreAccum] = useState([]);
  const [dates, setDates] = useState([]);
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
    if (graphData.length !== 0) {
      lineChartConfig(graphData);
    }
  }, [graphData]);

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
      .get("http://localhost:5000/score", config)
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
      .get("http://localhost:5000/score/graph", config)
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

  const accumChartConfig = (data, scoreArr) => {
    const color = "#8080ff";
    const dataSet = data.datasets;

    const score = scoreArr;

    const dateFormat = data.labels.map((date) => {
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);
      const result = `${month}-${day}`;
      return result;
    });

    let result = { labels: dateFormat, datasets: dataSet };
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
      .get("http://localhost:5000/users", config)
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

  console.log(dates);
  console.log(scoreAccum);
  // console.log(dates);
  // console.log(scoreAccum);
  // console.log(graphData);

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
            <Graph chartData={graphData} lineData={lineData}></Graph>
          )}
        </GraphContainer>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
