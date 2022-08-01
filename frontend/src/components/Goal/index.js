import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

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
  Checkbox,
} from "./GoalElement";

import { goalActions } from "../../store/goal";

const Goal = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);
  const goals = useSelector((state) => state.goal.goals);
  const [isEmpty, setIsEmpty] = useState(true);
  const [checkedItem, setCheckedItem] = useState([]);
  const [completedGoal, setCompletedGoal] = useState([]);

  useEffect(() => {
    getAllGoals();
    return () => {};
  }, []);

  useEffect(() => {
    if (goals.length !== 0) {
      setIsEmpty(false);
    }
    return () => {};
  }, [goals]);

  const getAllGoals = async () => {
    // event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("/goals", config)
      .then((response) => {
        if (response.data.success) {
          dispatch(goalActions.update(response.data.data));
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
      });
  };

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
        Authorization: `Bearer ${token}`,
      },
    };

    let body = {
      goalsArray: completedGoal,
    };

    axios
      .post("/score", body, config)
      .then((response) => {
        if (response.data.success) {
          alert("목표 점수 생성! ");
          history.push("/score/main");
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(`${statusCode} ${err.message}`);
      });
  };

  return (
    <GoalContainer>
      <GoalContent>
        <GoalCreateBtn to="/goal/create">목표 설정/변경</GoalCreateBtn>
        {isEmpty ? (
          <GoalShow>
            <NoGoalImg src={process.env.PUBLIC_URL + "/img/empty_goal.svg"} />
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
      </GoalContent>
    </GoalContainer>
  );
};

export default Goal;
