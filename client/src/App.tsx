import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './layouts/root';

function App() {
  return (
    <Router>
      <h1>APP</h1>
      <Root />
    </Router>
  );
}

export default App;
