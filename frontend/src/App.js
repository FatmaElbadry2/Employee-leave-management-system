import React from "react";
import { Route, Switch } from "react-router-dom";
import RegisterForm from "./components/signup/signup";
import Landing from "./components/landing/landing";
import NormalLoginForm from "./components/login/login";
import ViewRequests from "./components/requests/view";
//import NewRecipe from "./components/newRecipe/newRecipe";
//import ViewAll from "./components/View Recipes/viewall";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <Route>
        <Switch>
          <Route path="/NormalLoginForm" component={NormalLoginForm} />
          <Route path="/RegisterForm" component={RegisterForm} />
          <Route path="/" exact component={Landing} />
          <Route path="/ViewRequests" component={ViewRequests} />
        </Switch>
      </Route>
    </React.Fragment>
  );
}

export default App;
