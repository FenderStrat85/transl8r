import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth.layout';
import AppLayout from './layouts/app.layout';
import NotFound from './screen/NotFound.screen';
import LoginScreen from './screen/Login.screen';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth'><AuthLayout /></Route>
        <Route path='/app'><AppLayout /></Route>
        <Redirect from='/' to='auth/login'><LoginScreen /></Redirect>
        <Route path='*'><NotFound /></Route>
      </Switch>
    </Router>
  );
}

export default App;
