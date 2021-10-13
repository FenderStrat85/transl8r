import React from 'react';
import Dashboard from '../screen/Dashboard.screen';
import SelectJob from '../screen/SelectJob.screen';
import TranslatorJobDetail from '../components/items/Translator.job.detail';
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
import TranslatorJobList from '../components/list/TranslatorJob.list';

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
            <SelectJob />
          </Route>

          {/* Customer Dashboard is where the user can see a list of active jobs */}
          <Route path="/app/customer/dashboard">
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

          {/* {CUSTOMER JOBS ROUTE} */}
          <Route exact path='/app/customer/acceptedjob/image:id'>
            {/* {IM THE IMAGE COMPONENT} */}
            <h1>IMAGE COMPONENT</h1>
          </Route>
          <Route exact path='/app/customer/acceptedjob/chat:id'>
            {/* {IM THE CHAT COMPONENT} */}
            <h1>CHAT COMPONENT</h1>
          </Route>
          <Route exact path='/app/customer/acceptedjob/video:id'>
            {/* {IM THE VIDEO COMPONENT} */}
            <h1>VIDEO COMPONENT</h1>
          </Route>


          {/* Translator Route */}
          {/* This is the translator dashboard, where a translator can view available jobs for translation */}
          <Route exact path="/app/translator/dashboard">
            <Dashboard />
          </Route>
          {/* Here the translator can view pending and completed jobs  */}
          <Route exact path="/app/translator/dashboard/history">
            <Dashboard />
          </Route>
          {/* Here a translator can view a selected job tile in more detail, and accept the job */}
          <Route exact path="/app/translator/dashboard/viewjob">
            <TranslatorJobDetail />
          </Route>

          {/* TRANSLATOR JOB ROUTES */}
          <Route exact path="/app/translator/image:jobId">
            <h1>Image Component</h1>
          </Route>
          <Route exact path="/app/translator/chat:jobId">
            <h1>Chat Component</h1>
          </Route>
          <Route exact path="/app/translator/video:jobId">
            <h1>Video Component</h1>
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
