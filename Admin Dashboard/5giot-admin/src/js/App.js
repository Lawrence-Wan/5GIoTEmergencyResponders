import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../styles/App.css";
import Dashboard from "./dashboardComponent/dashboard";
import PrivateRoute from "./routesComponent/privateRoute";
import Login from "./userComponent/login";
import NetworkError from "./networkError";
import Signup from "./userComponent//signup";
import ForgotPassword from "./userComponent/forgotPassword";
import "../styles/pace.css";
import AppContext from "./appContext";
import { useState } from "reactn";

function App() {
  const [globalState, setGlobalState] = useState({});
  const setUserState = (obj) => {
    setGlobalState({ user: obj });
  };
  const userSettings = {
    globalState,
    setUserState,
  };
  return (
    <AppContext.Provider value={userSettings}>
      <React.Fragment>
        <div>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/error" component={NetworkError} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgotPassword" component={ForgotPassword} />
            </Switch>
          </Router>
        </div>
      </React.Fragment>
    </AppContext.Provider>
  );
}

export default App;
