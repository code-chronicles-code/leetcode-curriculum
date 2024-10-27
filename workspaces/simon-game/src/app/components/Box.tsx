import React from "react";

type Props = { color?: string };

export function Box(props: Props) {
  const style = {
    backgroundColor: props.color || "lightblue",
    height: 100,
    width: 100,
  };
  return (
    <div
      style= {style}
    />
  );
}