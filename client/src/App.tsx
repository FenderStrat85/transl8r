import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth.layout';
import AppLayout from './layouts/app.layout';
import LoginScreen from './screen/Login.screen';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth'><AuthLayout /></Route>
        <Route path='/app'><AppLayout /></Route>
        <Redirect from='/' to='auth/login'><LoginScreen /></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
