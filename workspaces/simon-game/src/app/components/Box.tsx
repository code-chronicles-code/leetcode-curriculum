import React from "react";

type Props = { color?: string; height?: number; width?: number };

export function Box(props: Props) {
  return (
    <div
      style={{
        backgroundColor: props.color ?? "lightblue",
        height: props.height ?? 100,
        width: props.width ?? 100,
        borderRadius: 20, // rounded corners
        margin: 10, // spaces
      }}
    />
  );
}
