import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../screen/Login.screen';
import Register from '../screen/Register.screen';

const AuthLayout = () => {
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

export default AuthLayout;
