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
      --grey: #e5e5ea;
      --text-grey: #c7c7cc;
      --shadow: #0000003d;
      --black-layout-color: rgba(0, 0, 0, 0.7);
    }

    [data-theme="dark"] {
      --main-bg-color: #434c5f;
      --main-text-color: #fff;
      --grey: #c7c7cc;
      --text: #000;
      --shadow: #ffffff3d;
    }

    div#root {
      background-color: var(--main-bg-color);
    }

    span {
      color: var(--main-text-color);
    }
  }
`;
