import React from "react";

type Props = {
  color?: string;
  height?: number;
  width?: number;
  margin?: number;
  handleClick: () => void;
};

export function Box({
  color = "lightblue",
  height = 100,
  width = 100,
  margin,
  handleClick,
}: Props) {
  return (
    <button
      style={{
        backgroundColor: color,
        height: height,
        width: width,
        borderRadius: 20, // rounded corners
        margin: margin, // spaces between boxes
        cursor: "pointer",
        border: 0,
      }}
      onClick={handleClick}
    />
  );
}
