import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

import { Routes } from "./constants/routes";

import logo from "./logo.svg";

const Actions = lazy(() => import("./pages/actions"));
const Tables = lazy(() => import("./pages/tables"));

function App() {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="actions">
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path={Routes.ACTIONS} component={Actions} />
            <Route path={Routes.TABLES} component={Tables} />
          </Switch>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
