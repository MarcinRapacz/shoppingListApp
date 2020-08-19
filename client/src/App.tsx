import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Route } from "./components/Router";
import Auth from "./features/auth/Auth";
import { getToken } from "./tools/localStorage";
import * as auth from "./features/auth/authSlice";
import "./App.css";
import Alert from "./features/alert/Alert";

function App() {
  const dispatch = useDispatch();
  const token = getToken();
  if (token) {
    dispatch(auth.set(token));
  }

  return (
    <div className="App">
      <Alert />
      <Router>
        <Switch>
          <Route path="/login">
            <Auth mode="login" />
          </Route>
          <Route path="/register">
            <Auth mode="create" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
