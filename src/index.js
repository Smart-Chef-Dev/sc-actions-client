import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { css } from "@linaria/core";
import ReactGA from "react-ga";

// eslint-disable-next-line no-undef
ReactGA.initialize(process.env.REACT_APP_GA);
ReactGA.pageview(window.location.pathname + window.location.search);

import App from "./App";

ReactDOM.render(
  <StrictMode>
    <App />
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
      --text: #fff;
      --black-layout-color: rgba(0, 0, 0, 0.7);
    }

    [data-theme="dark"] {
      --main-bg-color: #434c5f;
      --main-text-color: #fff;
      --text: #000;
    }

    div#root {
      background-color: var(--main-bg-color);
    }
  }
`;
