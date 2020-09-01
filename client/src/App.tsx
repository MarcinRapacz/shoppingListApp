import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Route } from "./components/Router";
import Auth from "./features/auth/Auth";
import { getToken } from "./tools/localStorage";
import * as auth from "./features/auth/authSlice";
import "./App.scss";
import Alert from "./features/alert/Alert";
import ListShoppingList from "./features/shoppingList/ListShoppingList";
import ShoppingListDetails from "./features/shoppingList/ShoppingListDetails";
import Loader from "./features/loader/Loader";

function App() {
  const dispatch = useDispatch();
  const token = getToken();
  if (token) {
    dispatch(auth.set(token));
  }

  return (
    <div className="App">
      <Loader />
      <Alert />
      <Router>
        <Switch>
          <Route path="/shoppingList" secure exact>
            <ListShoppingList />
          </Route>
          <Route path="/shoppingList/:id" secure exact>
            <ShoppingListDetails />
          </Route>
          <Route path="/login" exact>
            <Auth mode="login" />
          </Route>
          <Route path="/register" exact>
            <Auth mode="create" />
          </Route>
          <Redirect from="/" to="/shoppingList" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
