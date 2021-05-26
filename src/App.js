import { lazy, Suspense } from "react";
import { Switch } from "wouter";
import { styled } from "@linaria/react";

import ErrorBoundary from "pages/error-boundary";
import { Routes } from "constants/routes";
import Route from "components/Route";
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
const Menu = lazy(() => import("pages/menu" /* webpackChunkName: "menu" */));
const ExpandedMenu = lazy(() =>
  import("pages/menu/expanded-menu" /* webpackChunkName: "expanded-menu" */)
);
const Product = lazy(() =>
  import("pages/menu/product" /* webpackChunkName: "product" */)
);
const Basket = lazy(() =>
  import("pages/menu/basket" /* webpackChunkName: "basket" */)
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
                  path={Routes.PRODUCT}
                  component={Product}
                  layout={SimpleLayout}
                />
                <Route
                  path={Routes.BASKET}
                  component={Basket}
                  layout={SimpleLayout}
                />
                <Route
                  path={Routes.MENU}
                  component={Menu}
                  layout={SimpleLayout}
                />
                <Route
                  path={Routes.EXPANDED_MENU}
                  component={ExpandedMenu}
                  layout={SimpleLayout}
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
