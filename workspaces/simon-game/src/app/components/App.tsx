import React from "react";

import { Box } from "./Box.tsx";

export function App() {
  return (
    <div>
      <Box color="red" />
      <Box
        color={
          // cobalt blue
          "#0050B5"
        }
      />
      <Box color="green" />
      <Box color="yellow" />
    </div>
  );
}
