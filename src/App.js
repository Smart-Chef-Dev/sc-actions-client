import { lazy, Suspense } from "react";
import { Switch } from "wouter";
import { styled } from "@linaria/react";
import { QueryClient, QueryClientProvider } from "react-query";

import ErrorBoundary from "pages/error-boundary";
import { Routes } from "constants/routes";
import Route from "components/Route";
import PrivateRoute from "components/private-route";
import MainLayout from "components/MainLayout";
import BackOfficeLayout from "components/backOfficeLayout";
import SimpleLayout from "components/SimpleLayout";
import Loader from "components/loaders";
import DarkModeContext from "contexts/dark-mode-context";
import { TranslationContext } from "contexts/translation-context";

const queryClient = new QueryClient();

const RestaurantLogin = lazy(() =>
  import("pages/restaurant-login" /* webpackChunkName: "restaurant-login" */)
);
const Actions = lazy(() =>
  import("pages/actions" /* webpackChunkName: "actions" */)
);
const QrCodeBuilder = lazy(() =>
  import("pages/qr-code-builder" /* webpackChunkName: "qr-code-builder" */)
);
const Menu = lazy(() =>
  import("pages/menu/main-menu" /* webpackChunkName: "menu" */)
);
const ExpandedMenu = lazy(() =>
  import("pages/menu/expanded-menu" /* webpackChunkName: "expanded-menu" */)
);
const Product = lazy(() =>
  import("pages/menu/product" /* webpackChunkName: "product" */)
);
const Basket = lazy(() =>
  import("pages/menu/basket" /* webpackChunkName: "basket" */)
);
const SingUp = lazy(() =>
  import("pages/back-office/sing-up" /* webpackChunkName: "sing-up" */)
);
const SingIn = lazy(() =>
  import("pages/back-office/sing-in" /* webpackChunkName: "sing-in" */)
);
const Dashboard = lazy(() =>
  import("pages/back-office/subscriptions" /* webpackChunkName: "dashboard" */)
);
const MenuBuilder = lazy(() =>
  import(
    "pages/back-office/menu-builder" /* webpackChunkName: "menu-builder" */
  )
);

function App() {
  return (
    <s.Container>
      <QueryClientProvider client={queryClient}>
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
                    component={Dashboard}
                    layout={SimpleLayout}
                  />
                  <PrivateRoute
                    path={Routes.MENU_BUILDER}
                    component={MenuBuilder}
                    layout={BackOfficeLayout}
                  />
                  <Route
                    path={Routes.PRODUCT}
                    component={Product}
                    layout={SimpleLayout}
                    needMenu={true}
                  />
                  <Route
                    path={Routes.BASKET}
                    component={Basket}
                    layout={SimpleLayout}
                    needMenu={true}
                  />
                  <Route
                    path={Routes.MENU}
                    component={Menu}
                    layout={SimpleLayout}
                    needMenu={true}
                  />
                  <Route
                    path={Routes.EXPANDED_MENU}
                    component={ExpandedMenu}
                    layout={SimpleLayout}
                    needMenu={true}
                  />
                  <Route
                    path={Routes.QR_CODE_BUILDER}
                    component={QrCodeBuilder}
                    layout={SimpleLayout}
                  />
                  <Route
                    path={Routes.RESTAURANT_LOGIN}
                    component={RestaurantLogin}
                    layout={MainLayout}
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
      </QueryClientProvider>
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
