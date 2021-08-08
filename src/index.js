import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { css } from "@linaria/core";
import ReactGA from "react-ga";
import { RecoilRoot } from "recoil";

// eslint-disable-next-line no-undef
ReactGA.initialize(process.env.REACT_APP_GA);
ReactGA.pageview(window.location.pathname + window.location.search);

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </StrictMode>,
  document.getElementById("root"),
  () => document.getElementById("spinner")?.remove()
);

export const globals = css`
  :global() {
    :root {
      --main-bg-color: #fff;
      --main-text-color: #000;
      --main-color: #ff2d55;
      --main-color-disabled: rgba(255, 45, 85, 0.5);
      --text: #fff;
      --color-for-selected-object: #e5e5ea;
      --text-grey: #c7c7cc;
      --label-color: #434c5f;
      --light-grey: #f5f5f8;
      --grey: #00000066;
      --box-shadow: #0000003d;
      --loader-background-color: #ede8e8;
      --loader-foreground-color: #dfd7d7;
      --black-layout-color: rgba(0, 0, 0, 0.7);
      --error: #f36c6c;
    }

    [data-theme="dark"] {
      --main-bg-color: #434c5f;
      --main-text-color: #fff;
      --color-for-selected-object: #e5e5ea26;
      --text: #000;
      --box-shadow: #ffffff3d;
      --grey: #c7c7cc;
      --loader-background-color: #686c87;
      --loader-foreground-color: #566586;
    }

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    ::-webkit-scrollbar-thumb {
      background: #929eaa;
    }

    div#root {
      background-color: var(--main-bg-color);
    }

    span {
      color: var(--main-text-color);
    }
  }
`;
