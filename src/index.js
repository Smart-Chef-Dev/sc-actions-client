import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { css } from "@linaria/core";

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
