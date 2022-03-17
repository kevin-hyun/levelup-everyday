import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Auth from './hoc/auth';

function App() {
  // const NewLandingPage = Auth(Home, null);
  // const NewSignInPage = Auth(SignInPage, false);
  // const NewSignUpPage = Auth(SignUpPage, false);
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignInPage} exact />
        <Route path="/signup" component={SignUpPage} exact />
      </Switch>
    </Router>
  );
}

export default App;
