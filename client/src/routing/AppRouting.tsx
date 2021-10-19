import Dashboard from '../screen/Dashboard';
import SelectJob from '../screen/SelectJob';
import TranslatorPendingJobDetails from '../components/job-details/TranslatorPendingJobDetails';
import { useContext } from 'react';
import { UserContext } from '../context/Context';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';
import VideoPlayer from '../components/video/VideoPlayer';
import NotFound from '../screen/NotFound';
import ImageForm from '../components/form/ImageForm';
import ChatAndVideoForm from '../components/form/ChatAndVideoForm';
import Conversation from '../components/chat/ConversationJob';
import TranslatorImage from '../components/image/TranslatorImage';
import CompletedJobList from '../components/list/CompletedJobList';
import CompletedChat from '../components/chat/CompletedChat';
import CompletedImage from '../components/image/CompletedImage';

const AppRouting = (): JSX.Element => {
  const { user } = useContext(UserContext);
  let job: any = useLocation();

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
            <ImageForm jobType={'image'} />
          </Route>

          {/* This is the route for Cappuccino, where a user will taken to a chat screen  */}
          <Route exact path="/app/customer/createjob/cappuccino">
            <ChatAndVideoForm jobType={'chat'} />
          </Route>

          {/* This is the route for Macchiato, where a user will taken to a video chat screen  */}
          <Route exact path="/app/customer/createjob/macchiato">
            <ChatAndVideoForm jobType={'video'} />
          </Route>

          {/* {CUSTOMER JOBS ROUTE} */}
          <Route exact path="/app/customer/acceptedjob/image:id"></Route>
          <Route exact path="/app/customer/acceptedjob/chat:id">
            <Conversation />
          </Route>
          <Route exact path="/app/customer/acceptedjob/video:id">
            <VideoPlayer />
          </Route>
          <Route exact path="/app/customer/image/completed">
            <CompletedImage />
          </Route>
          <Route exact path="/app/customer/chat/completed">
            <CompletedChat />
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
            <TranslatorPendingJobDetails />
          </Route>

          {/* TRANSLATOR JOB ROUTES */}
          <Route exact path="/app/translator/image:jobId">
            <TranslatorImage job={job.state} />
          </Route>
          <Route exact path="/app/translator/chat:jobId">
            <Conversation />
          </Route>
          <Route exact path="/app/translator/video:jobId">
            <VideoPlayer />
          </Route>

          {/* COMPLETED JOBS CUSTOMERS AND TRANSLATORS */}
          <Route exact path="/app/completedJobs">
            <CompletedJobList />
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

export default AppRouting;
