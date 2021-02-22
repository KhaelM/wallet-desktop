import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ResetPassword from './ResetPassword';
import Home from './Home';
import NotFound from './NotFound';

import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}