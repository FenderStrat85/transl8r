import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthLayout from './layouts/auth.layout';
import AppLayout from './layouts/app.layout';
import NotFound from './screen/NotFound.screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/auth">
            <AuthLayout />
          </Route>
          <Route path="/app">
            <AppLayout />
          </Route>
          <Redirect from="/" to="auth/login"></Redirect>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
