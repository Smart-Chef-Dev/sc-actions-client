import { lazy, Suspense } from "react";
import { Switch } from "wouter";
import { styled } from "@linaria/react";

import ErrorBoundary from "pages/error-boundary";
import { Routes } from "constants/routes";
import Route from "components/Route";
import PrivateRoute from "components/private-route";
import MainLayout from "components/MainLayout";
import SimpleLayout from "components/SimpleLayout";
import Loader from "components/loader";
import DarkModeContext from "contexts/dark-mode-context";
import { TranslationContext } from "contexts/translation-context";

const RestaurantLogin = lazy(() =>
  import("pages/restaurant-login" /* webpackChunkName: "restaurant-login" */)
);
const Actions = lazy(() =>
  import("pages/actions" /* webpackChunkName: "actions" */)
);
const QrCodeBuilder = lazy(() =>
  import("pages/qr-code-builder" /* webpackChunkName: "qr-code-builder" */)
);

const SingUp = lazy(() =>
  import("pages/back-office/sing-up" /* webpackChunkName: "sing-up" */)
);

const SingIn = lazy(() =>
  import("pages/back-office/sing-in" /* webpackChunkName: "sing-in" */)
);

const dashboard = lazy(() =>
  import("pages/back-office/dashboard" /* webpackChunkName: "dashboard" */)
);

function App() {
  return (
    <s.Container>
      <TranslationContext>
        <DarkModeContext>
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <Switch>
                <Route
                  path={Routes.SING_UP}
                  component={SingUp}
                  layout={MainLayout}
                />
                <Route
                  path={Routes.SING_IN}
                  component={SingIn}
                  layout={MainLayout}
                />
                <PrivateRoute
                  path={Routes.DASHBOARD}
                  component={dashboard}
                  layout={MainLayout}
                />
                <Route
                  path={Routes.RESTAURANT_LOGIN}
                  component={RestaurantLogin}
                  layout={MainLayout}
                />
                <Route
                  path={Routes.QR_CODE_BUILDER}
                  component={QrCodeBuilder}
                  layout={SimpleLayout}
                />
                <Route
                  path={Routes.ACTIONS}
                  component={Actions}
                  layout={MainLayout}
                />
              </Switch>
            </ErrorBoundary>
          </Suspense>
        </DarkModeContext>
      </TranslationContext>
    </s.Container>
  );
}

const s = {
  Container: styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  `,
};

export default App;
