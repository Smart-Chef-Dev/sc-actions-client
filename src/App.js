import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";

import DarkModeSwitcher from "./components/dark-mode-switcher";
import Logo from "./components/logo";
import { Routes } from "./constants/routes";
import ErrorBoundary from "./pages/error-boundary";
import DarkModeContext from "./contexts/dark-mode-context";

const Actions = lazy(() => import("./pages/actions"));

function App() {
  return (
    <div className="container">
      <DarkModeContext>
        <DarkModeSwitcher />
        <Logo />
        <div className="page-container">
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Switch>
                <Route path={Routes.ACTIONS} component={Actions} />
              </Switch>
            </ErrorBoundary>
          </Suspense>
        </div>
      </DarkModeContext>
    </div>
  );
}

export default App;
