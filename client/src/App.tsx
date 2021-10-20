import './scss/main.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthRouting from './routing/AuthRouting';
import AppRouting from './routing/AppRouting';
import NotFound from './screen/NotFound';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient: QueryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <Route path="/auth">
              <AuthRouting />
            </Route>
            <Route path="/app">
              <AppRouting />
            </Route>
            <Redirect from="/" to="auth/login"></Redirect>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </>
  );
}

export default App;
