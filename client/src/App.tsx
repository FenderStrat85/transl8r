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

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          <AuthLayout />
        </Route>
        <Route path="/app">
          <AppLayout />
        </Route>
        <Redirect path="*">
          <NotFound />{' '}
        </Redirect>
      </Switch>
    </Router>
  );
}

export default App;
