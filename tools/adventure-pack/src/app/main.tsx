// TODO: specify the globals via ESLint config
/* global window, document */

import nullthrows from "nullthrows";
import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return <div>Hello World from React!!</div>;
}

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
