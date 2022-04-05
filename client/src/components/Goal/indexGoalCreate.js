import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  GoalContainer,
  GoalContent,
  GoalCreateBtn,
  GoalShow,
  GoalSubmitBtn,
  NoGoalImg,
  NoGoalText,
  GoalCategoryImg,
  GoalCreateText,
  GoalCreateH1,
  GoalCreateForm,
  FormInput,
  FormSelect,
  FormButton,
} from './GoalCreateElement';
import categoryImg from '../../images/category.png';

import AuthContext from '../../store/auth-context';

const CreateIndex = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const categoryArray = [
    { key: 0, category: '건강' },
    { key: 1, category: '경제관리' },
    { key: 2, category: '커리어' },
    { key: 3, category: '어학' },
    { key: 4, category: '습관 가지기' },
    { key: 5, category: '취미생활' },
  ];
  const categoryElements = categoryArray.map((category) => {
    return (
      <option key={category.key} value={category.category}>
        {category.category}
      </option>
    );
  });

  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState({});

  const onSubmitHandler = (event) => {
    // 자동 새로고침 방지
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    let body = {
      category,
      contents: goal,
    };

    axios
      .post('http://localhost:5000/goals', body, config)
      .then((response) => {
        if (response.data.success) {
          alert('목표 생성 완료!');
          history.replace('/goal/create');
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  return (
    <GoalContainer>
      <GoalContent>
        <GoalCreateH1>목표 설정 </GoalCreateH1>
        <GoalCategoryImg src={categoryImg} />
        <GoalCreateText>6개의 카테고리가 있어요.</GoalCreateText>
        {/* <GoalCreateBtn>목표 설정하기</GoalCreateBtn> */}
        {/* <GoalShow isEmpty={true}>text</GoalShow> */}
        {/* <GoalSubmitBtn>하루 목표 완료!</GoalSubmitBtn> */}

        <GoalCreateForm>
          <FormInput
            type="text"
            required
            placeholder="목표를 적어주세요"
            onChange={(e) => {
              setGoal(e.target.value);
            }}
          />
          <FormSelect
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            {categoryElements}
          </FormSelect>
          <FormButton type="submit" onClick={onSubmitHandler}>
            레벨업
          </FormButton>
        </GoalCreateForm>
        <GoalShow>
          <NoGoalText>
            현재 설정된 목표가 없어요! <br />
            목표를 설정해주세요.
          </NoGoalText>
        </GoalShow>
      </GoalContent>
    </GoalContainer>
  );
};

export default CreateIndex;
