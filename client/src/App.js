import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import PublicRoute from './components/utils/PublicRoute';
import PrivateRoute from './components/utils/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={false} path="/" component={Home} exact />
        <PublicRoute
          restricted={true}
          path="/signin"
          component={SignInPage}
          exact
        />
        <PublicRoute
          restricted={true}
          path="/signup"
          component={SignUpPage}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
