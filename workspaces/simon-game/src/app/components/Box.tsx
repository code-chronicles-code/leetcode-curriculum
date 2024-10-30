import React from "react";

type Props = {
  color?: string;
  height?: number;
  width?: number;
  margin?: number;
  onClick: () => void;
};

export function Box({
  color = "lightblue",
  height = 100,
  width = 100,
  margin,
  onClick,
}: Props) {
  return (
    <button
      style={{
        backgroundColor: color,
        height,
        width,
        borderRadius: 20, // rounded corners
        margin, // spaces between boxes
        cursor: "pointer",
        border: 0,
      }}
      onClick={onClick}
    />
  );
}
