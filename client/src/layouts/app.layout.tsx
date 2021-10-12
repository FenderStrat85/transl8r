import React from 'react';
import Dashboard from '../screen/Dashboard.screen';
import SelectJob from '../screen/SelectJob.screen';
import { useContext } from 'react';
import { UserContext } from '../services/Context';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import CreateJob from '../screen/CreateJob.screen';

const AppLayout = () => {

  const { user } = useContext(UserContext)



  return (
    <>
      {/* {Customer Route} */}

      {/* This will redirect to the login  page if the user logs out or becomes unauthenticated */}
      {/* {!user.isAuthenticated && <Redirect to='/auth/login' />} */}
      <Route path='/app/customer/selectjob'>
        <h1>Customer Select Job (Home)</h1>
        <SelectJob />
      </Route>

      <Route path='/app/customer/dashboard'>
        <h1>Customer Dashboard</h1>
        <Dashboard />
      </Route>

      <Route path='/app/customer/selectjob/espresso'>
        <CreateJob />
      </Route>
      <Route path='/app/customer/selectjob/venti'>
        <CreateJob />
      </Route>
      <Route path='/app/customer/selectjob/grande'>
        <CreateJob />
      </Route>

      {/* {Translator Route} */}
      <Route path='/app/translator/dashboard'>
        <h1>Translator Dashboard (Home)</h1>
        <Dashboard />
      </Route>
    </>
  )
}

export default AppLayout;
