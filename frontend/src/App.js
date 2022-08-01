import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Home from "./pages/Home";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import GoalPage from "./pages/GoalPage";
import GoalCreatePage from "./pages/GoalCreatePage";
import ScoreMainPage from "./pages/ScoreMainPage";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        {!isAuthenticated && (
          <Route path="/signin" component={SignInPage} exact />
        )}
        {!isAuthenticated && (
          <Route path="/signup" component={SignUpPage} exact />
        )}

        {isAuthenticated && <Route path="/goal" component={GoalPage} exact />}

        {isAuthenticated && (
          <Route path="/goal/create" component={GoalCreatePage} exact />
        )}
        {isAuthenticated && (
          <Route path="/score/main" component={ScoreMainPage} exact />
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
