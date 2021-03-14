import { Suspense, lazy } from "react";
import { styled } from "@linaria/react";
import { Route, Switch } from "wouter";

import DarkModeSwitcher from "components/dark-mode-switcher";
import Logo from "components/logo";
import Loader from "components/loader";
import { Routes } from "constants/routes";
import ErrorBoundary from "pages/error-boundary";
import DarkModeContext from "contexts/dark-mode-context";
import { TranslationContext } from "contexts/translation-context";

const Actions = lazy(() => import("pages/actions"));

function App() {
  return (
    <Container>
      <TranslationContext>
        <DarkModeContext>
          <DarkModeSwitcher />
          <Logo />
          <PageContainer>
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <Switch>
                  <Route path={Routes.ACTIONS} component={Actions} />
                </Switch>
              </ErrorBoundary>
            </Suspense>
          </PageContainer>
        </DarkModeContext>
      </TranslationContext>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

const PageContainer = styled.div`
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default App;
