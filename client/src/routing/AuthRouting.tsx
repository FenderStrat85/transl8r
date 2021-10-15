import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../screen/Login';
import Register from '../screen/Register';

const AuthRouting = () => {
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
