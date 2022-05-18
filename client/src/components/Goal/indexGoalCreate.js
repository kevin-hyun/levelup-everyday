import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  GoalContainer,
  GoalContent,
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
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [categoryList, setCategoryList] = useState([]);

  const getCategory = () => {
    axios
      .get('http://localhost:5000/category/default')
      .then((response) => {
        if (response.data.success) {
          setCategoryList(response.data.data);
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const categoryElements = categoryList.map((category) => {
    return (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    );
  });

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
          window.location('goal');
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
      </GoalContent>
    </GoalContainer>
  );
};

export default CreateIndex;
