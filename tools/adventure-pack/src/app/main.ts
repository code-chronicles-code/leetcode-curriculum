// TODO: specify the globals via ESLint config
/* global window, document */

import nullthrows from "nullthrows";

window.addEventListener(
  "load",
  () => {
    nullthrows(
      document.getElementById("main"),
      'No element with id "main" in the DOM!',
    ).innerHTML = "Hello World!!";
  },
  { once: true },
);
