import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ResetPassword from './ResetPassword';
import Home from './Home';
import NotFound from './NotFound';

import './App.css';

const { PUBLIC_URL } = process.env;

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path={PUBLIC_URL + "/reset-password"}>
          <ResetPassword />
        </Route>
        <Route exact path={PUBLIC_URL + "/"}>
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}