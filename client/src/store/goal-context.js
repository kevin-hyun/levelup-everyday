import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';

import AuthContext from './auth-context';

const GoalContext = React.createContext({
  goals: [],
  reset: () => {},
});

export const GoalContextProvider = (props) => {
  const [goals, setGoals] = useState([]);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getAllGoals();

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

  const contextvalue = {
    goals: goals,
    reset: resetGoal,
  };

  return (
    <GoalContext.Provider value={contextvalue}>
      {props.children}
    </GoalContext.Provider>
  );
};

export default GoalContext;
