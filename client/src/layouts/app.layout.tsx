import React from 'react';
import Dashboard from '../screen/Dashboard.screen';
import { UserContext } from '../services/Context';

const AppLayout = () => {
  return (
    <>
      <Route path='/app/customer/selectJob'>
        <h1>Your order:</h1>
        <SelectJob />
      </Route>
      <Route path='/app/customer/dashboard'>
        <h1>Your order:</h1>
        <Dashboard />
      </Route>
      <Dashboard />
    </>
  )
}

export default AppLayout;
