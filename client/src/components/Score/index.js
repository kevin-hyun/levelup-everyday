import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import {
  ScoreContainer,
  ScoreContent,
  ScoreCircle,
  ScoreContinuity,
  ScoreCalc,
  ScoreGraphLink,
  ScoreText,
} from './ScoreElement';

import Graph from '../Graph/index';
import AuthContext from '../../store/auth-context';

const Score = (props) => {
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState([]);
  const [scoreAccum, setScoreAccum] = useState(0);
  const [continuity, setContinuity] = useState(0);

  useEffect(() => {
    getAllScore();
    if (!!score) {
      calcScore(score);
      getContinuity();
    } else {
      setScoreAccum(0);
    }
    return () => {};
  }, []);

  const getAllScore = () => {
    // event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    axios
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
    const sum = score.reduce(function (prev, next) {
      return prev + next.score;
    }, 0);
    setScoreAccum(sum);
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
          <ScoreContinuity>
            {continuity}
            <ScoreText>일 연속</ScoreText>
          </ScoreContinuity>
          <ScoreText>성장점수</ScoreText>
          <ScoreCalc>{scoreAccum}</ScoreCalc>
        </ScoreCircle>
        <ScoreGraphLink to="/">성장곡선</ScoreGraphLink>
      </ScoreContent>
      <Graph score={score} />
    </ScoreContainer>
  );
};

export default Score;
