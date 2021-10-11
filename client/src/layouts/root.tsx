import { Switch, Route, Redirect } from 'react-router-dom';
import AuthLayout from './auth.layout';
import AppLayout from './app.layout';
import LoginScreen from '../screen/Login.screen';


import { useState } from 'react';
// import user logged in state here
// True --> '/app' route
// False --> '/auth' route
const Root = () => {
  return (
    <>
      <Switch>
        <Route path='/auth'><AuthLayout /></Route>
        <Route path='/app'><AppLayout /></Route>
        <Redirect from='/' to='auth/login'><LoginScreen /></Redirect>
      </Switch>
    </>
  );
}

export default Root;