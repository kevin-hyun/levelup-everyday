import './App.css';
import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import GoalPage from './pages/GoalPage';
import GoalCreatePage from './pages/GoalCreatePage';

import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        {!authCtx.isLoggendIn && (
          <Route path="/signin" component={SignInPage} exact />
        )}
        {!authCtx.isLoggendIn && (
          <Route path="/signup" component={SignUpPage} exact />
        )}

        {authCtx.isLoggendIn && (
          <Route path="/goal" component={GoalPage} exact />
        )}

        {authCtx.isLoggendIn && (
          <Route path="/goal/create" component={GoalCreatePage} exact />
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
