import { Switch, Route } from 'react-router-dom';
import Login from '../screen/Login';
import Register from '../screen/Register';

const AuthRouting = (): JSX.Element => {
  return (
    <Switch>
      <Route path="/auth/login" exact>
        <Login />
      </Route>
      <Route path="/auth/register" exact>
        <Register />
      </Route>
    </Switch>
  );
};

export default AuthRouting;
