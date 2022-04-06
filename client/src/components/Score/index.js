import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';

import {
  ScoreContainer,
  ScoreContent,
  ScoreCircle,
  ScoreContinuity,
  ScoreCalc,
  ScoreGraphLink,
} from './ScoreElement';

import AuthContext from '../../store/auth-context';

const Score = (props) => {
  const authCtx = useContext(AuthContext);
  const [score, setScore] = useState([]);
  const [scoreAccum, setScoreAccum] = useState(0);

  useEffect(() => {
    getAllScore();
    if (!!score) {
      calcScore();
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

  const calcScore = () => {
    const sum = score.reduce(function (prev, next) {
      return prev + next.score;
    }, 0);
    setScoreAccum(sum);
  };

  //   const goalList = goals.map((goal) => {
  //     return (
  //       <GoalWrapper key={goal._id}>
  //         <GoalList>{goal.contents}</GoalList>
  //         <Checkbox
  //           type="checkbox"
  //           id={goal._id}
  //           value={goal._id}
  //           onChange={(e) => {
  //             changeHandler(e.currentTarget.checked, goal._id);
  //           }}
  //           checked={checkedItem.includes(goal._id) ? true : false}
  //         />
  //       </GoalWrapper>
  //     );
  //   });

  return (
    <ScoreContainer>
      <ScoreContent>
        <ScoreCircle>
          <ScoreContinuity></ScoreContinuity>
          <ScoreCalc>{scoreAccum}</ScoreCalc>
        </ScoreCircle>
        <ScoreGraphLink to="/"></ScoreGraphLink>
      </ScoreContent>
    </ScoreContainer>
  );
};

export default Score;
