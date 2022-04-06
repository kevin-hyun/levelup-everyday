import React, { useContext, useState, useEffect } from 'react';

import {
  GoalContainer,
  GoalContent,
  GoalCreateBtn,
  GoalShow,
  GoalSubmitBtn,
  NoGoalImg,
  NoGoalText,
  GoalForm,
  GoalList,
  GoalWrapper,
  CheckboxAll,
  Checkbox,
} from './GoalElement';

import emptyGoal from '../../images/empty_goal.svg';

import axios from 'axios';
import AuthContext from '../../store/auth-context';

const Goal = (props) => {
  const [goals, setGoals] = useState([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [completedGoal, setCompletedGoal] = useState([]);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getAllGoals();
    if (!!goals) {
      setIsEmpty(false);
    }
    return () => {};
  }, []);

  const getAllGoals = () => {
    // event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    axios
      .get('http://localhost:5000/goals', config)
      .then((response) => {
        if (response.data.success) {
          setGoals(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  const [checkedItem, setCheckedItem] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedItem([...checkedItem, id]);
      setCompletedGoal([...completedGoal, id]);
    } else {
      setCheckedItem(checkedItem.filter((item) => item !== id));
      setCompletedGoal(completedGoal.filter((goal) => goal !== id));
    }
  };

  const goalList = goals.map((goal) => {
    return (
      <GoalWrapper key={goal._id}>
        <GoalList>{goal.contents}</GoalList>
        <Checkbox
          type="checkbox"
          id={goal._id}
          value={goal._id}
          onChange={(e) => {
            changeHandler(e.currentTarget.checked, goal._id);
          }}
          checked={checkedItem.includes(goal._id) ? true : false}
        />
      </GoalWrapper>
    );
  });

  const submitGoals = (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    let body = {
      goalsArray: completedGoal,
    };

    axios
      .post('http://localhost:5000/score', body, config)
      .then((response) => {
        if (response.data.success) {
          alert('목표 점수 생성! ');
        }
        //나중에 점수 화면 완성되면 그리로 리다이렉트
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  return (
    <GoalContainer>
      <GoalContent>
        <GoalCreateBtn to="/goal/create">목표 설정/변경</GoalCreateBtn>
        {isEmpty ? (
          <GoalShow>
            <NoGoalImg src={emptyGoal} />
            <NoGoalText>
              현재 설정된 목표가 없어요! <br />
              목표를 설정해주세요.
            </NoGoalText>
          </GoalShow>
        ) : (
          <GoalForm>
            {goalList}
            <GoalSubmitBtn onClick={submitGoals}>하루 끝!</GoalSubmitBtn>
          </GoalForm>
        )}

        {/* {goal && <GoalSubmitBtn>하루 목표 완료!</GoalSubmitBtn>} */}
      </GoalContent>
    </GoalContainer>
  );
};

export default Goal;
