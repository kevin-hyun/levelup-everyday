import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Auth from './hoc/auth';

function App() {
  const NewLandingPage = Auth(Home, null);
  const NewSignInPage = Auth(SignInPage, false);
  const NewSignUpPage = Auth(SignUpPage, false);
  return (
    <Router>
      <Switch>
        <Route path="/" component={NewLandingPage} exact />
        <Route path="/signin" component={NewSignInPage} exact />
        <Route path="/signup" component={NewSignUpPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
