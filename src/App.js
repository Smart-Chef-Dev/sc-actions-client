import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

import DarkModeSwitcher from "./components/dark-mode-switcher";
import Logo from "./components/logo";
import { Routes } from "./constants/routes";

const Actions = lazy(() => import("./pages/actions"));
const Tables = lazy(() => import("./pages/tables"));

function App() {
  return (
    <div className="container">
      <DarkModeSwitcher />
      <Logo />
      <div className="page-container">
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
