import React from 'react'
import { Route } from 'react-router-dom';
import Login from '../screen/Login.screen'
import Register from '../screen/Register.screen'

const Auth = () => {
  return (
    <>
      <Route path='auth/login' exact><Login /></Route>
      <Route path='auth/register' exact><Register /></Route>

    </>
  )
}

export default Auth;
