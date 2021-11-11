import { Fragment, Suspense } from "react";
import { Switch } from "wouter";
import { styled } from "@linaria/react";
import { QueryClient, QueryClientProvider } from "react-query";

import ErrorBoundary from "pages/error-boundary";
import Route from "components/Route";
import Loader from "components/loaders";
import DarkModeContext from "contexts/dark-mode-context";
import { TranslationContext } from "contexts/translation-context";
import { AppPages } from "./constants/appPages";

const queryClient = new QueryClient();

function App() {
  return (
    <s.Container>
      <QueryClientProvider client={queryClient}>
        <TranslationContext>
          <DarkModeContext>
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <Switch>
                  {AppPages.map((appPage, i) => (
                    <Fragment key={i}>
                      <Route {...appPage} />
                    </Fragment>
                  ))}
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
