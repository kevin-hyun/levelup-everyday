import React, { useContext, useState, useEffect } from 'react';

import axios from 'axios';

import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';

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
  GoalListContainer,
  ChangeBtn,
  GoalListWrapper,
  Iconwrapper,
} from './GoalCreateElement';
import { GoalList, GoalWrapper, Checkbox } from './GoalElement';

import AuthContext from '../../store/auth-context';
import GoalContext from '../../store/goal-context';

import categoryImg from '../../images/category.png';

const CreateIndex = () => {
  const authCtx = useContext(AuthContext);
  const goalCtx = useContext(GoalContext);
  const [goal, setGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [checkedItem, setCheckedItem] = useState([]);
  const [category, setCategory] = useState('621ef2fb7432c32bc3450b29');
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
  useEffect(() => {}, [goalCtx.goals]);

  const categoryElements = categoryList.map((category) => {
    return (
      <option key={category._id} value={category.name}>
        {category.name}
      </option>
    );
  });

  const deleteGoal = async (id, category, goal) => {
    const confirmation = window.confirm(`${goal}를(을) 삭제하시겠습니까?`);
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };
    let body = {
      category: category,
      contents: goal,
      softDelete: true,
    };
    if (confirmation) {
      await axios
        .put(`http://localhost:5000/goals/${id}`, body, config)
        .then((response) => {
          if (response.data.success) {
            alert('목표가 삭제되었습니다.');
            window.location = '/goal/create';
          }
        })
        .catch((err) => {
          const statusCode = err.message.slice(-3, err.message.length);
          console.log(err.message);
        });
    } else {
      alert('취소되었습니다.');
    }
  };

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
          window.location = 'goal/create';
        }
      })
      .catch((err) => {
        const statusCode = err.message.slice(-3, err.message.length);
        console.log(err.message);
      });
  };

  console.log(categoryList);

  const getName = (array, id) => {
    for (const element of array) {
      if (element['_id'] === id) {
        return element['name'];
      }
    }
  };
  const getColor = (array, id) => {
    for (const element of array) {
      if (element['_id'] === id) {
        return element['color'];
      }
    }
  };

  const goalList = goalCtx.goals.map((goal) => {
    const style = { color: '#fff', fontSize: '1.3em', margin: '5px' };
    const style2 = { color: '#f84f31', fontSize: '1.3em', margin: '5px' };
    console.log(getColor(categoryList, goal.category));
    return (
      <GoalListWrapper
        key={goal._id}
        color={getColor(categoryList, goal.category)}
      >
        <GoalList>
          {goal.contents} / {getName(categoryList, goal.category)}
        </GoalList>

        <Iconwrapper>
          <AiFillEdit style={style} />
          <BsFillTrashFill
            style={style2}
            onClick={function () {
              deleteGoal(goal._id, goal.category, goal.contents);
            }}
          />
        </Iconwrapper>
      </GoalListWrapper>
    );
  });

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
        <GoalListContainer>{goalList}</GoalListContainer>
      </GoalContent>
    </GoalContainer>
  );
};

export default CreateIndex;
