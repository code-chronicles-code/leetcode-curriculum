// TODO: specify the globals via ESLint config
/* global window, document */

import nullthrows from "nullthrows";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
  const [data, setData] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("items.json");

        if (!response.ok) {
          throw new Error(`Got status ${response.status} from server!`);
        }

        setData(await response.json());
      } catch (err) {
        // TODO: maybe avoid cast
        setError(err as Error);
      }
    })();
  }, []);

  return (
    <>
      {error && <pre>{error.stack}</pre>}
      {data && (
        <div>
          {Object.keys(data)
            .sort()
            .map((name) => (
              <div key={name}>
                <h1>{name}</h1>
                <pre>{data[name]}</pre>
              </div>
            ))}
        </div>
      )}
    </>
  );
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
