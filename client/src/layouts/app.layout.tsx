import React from 'react';
import Dashboard from '../screen/Dashboard.screen';
import SelectJob from '../screen/SelectJob.screen';
import { useContext } from 'react';
import { UserContext } from '../services/Context';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import CreateJob from '../screen/CreateJob.screen';
import NotFound from '../screen/NotFound.screen';
import ImageJobForm from '../components/form/ImageJob.form';
import ChatAndVideoJobForm from '../components/form/ChatAndVideoJob.form';

const AppLayout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {/* If user isn't authenticated, disable route rendering and redirect to login */}
      {/* if !user.isAuthenticated will disable authentication */}
      {user.isAuthenticated ? (
        //Customer Route
        <Switch>
          {/* Selectjob is where a customer can select a job type from a 3-button menu */}
          <Route exact path="/app/customer/selectjob">
            <h1>Customer Select Job (Home)</h1>
            <SelectJob />
          </Route>

          {/* Customer Dashboard is where the user can see a list of active jobs */}
          <Route path="/app/customer/dashboard">
            <h1>Customer Dashboard</h1>
            <Dashboard />
          </Route>

          {/* This is the route for Espresso, the user will be taken to a screen where the image can be submitted */}
          <Route exact path="/app/customer/createjob/espresso">
            {/* ESPRESSO CREATE JOB */}
            <h1>ESPRESSO</h1>
            <ImageJobForm />
          </Route>

          {/* This is the route for Cappuccino, where a user will taken to a chat screen  */}
          <Route exact path="/app/customer/createjob/cappuccino">
            {/* CAPPUCINO CREATE JOB */}
            <h1>CAPPUCCINO</h1>
            <ChatAndVideoJobForm jobType={'chat'} />
          </Route>

          {/* This is the route for Macchiato, where a user will taken to a video chat screen  */}
          <Route exact path="/app/customer/createjob/macchiato">
            {/* MACCHIATO CREATE JOB */}
            <h1>MACCHIATO</h1>
            <ChatAndVideoJobForm jobType={'video'} />
          </Route>

          {/* Translator Route */}
          {/* This is the translator dashboard, where a translator can view available jobs for translation */}
          <Route exact path="/app/translator/dashboard">
            <h1>Translator Dashboard (Home)</h1>
            <Dashboard />
          </Route>
          {/* Here the translator can view pending and completed jobs  */}
          <Route exact path="/app/translator/dashboard/history">
            <h1>Translator Accepted (Home)</h1>
            <Dashboard />
          </Route>

          {/* 404 route */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      ) : (
        // Unauthorised user sent straight to login
        <Redirect to="/auth/login"></Redirect>
      )}
    </>
  );
};

export default AppLayout;
