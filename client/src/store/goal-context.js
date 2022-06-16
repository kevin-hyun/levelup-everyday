import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import AuthContext from './auth-context';

const GoalContext = React.createContext({
  goals: [],
  loading: true,
  reset: () => {},
});

export const GoalContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('goalcontext-useEffect');
    getAllGoals();
    setLoading(false);
    console.log(loading);
    return () => {};
  }, []);

  const getAllGoals = async () => {
    // event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    };

    await axios
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

  const resetGoal = () => {
    setGoals([]);
  };

  console.log('실행 시점');

  const contextvalue = {
    goals,
    reset: resetGoal,
    loading,
  };

  return (
    <GoalContext.Provider value={contextvalue}>
      {console.log('goalContext 렌더링')}
      {props.children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
