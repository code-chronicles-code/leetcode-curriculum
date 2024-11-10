import nullthrows from "nullthrows";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/App.tsx";

window.addEventListener(
  "load",
  () => {
    ReactDOM.createRoot(
      nullthrows(
        document.getElementById("main"),
        'No element with id "main" in the DOM!',
      ),
    ).render(<App />);
  },
  { once: true },
);
