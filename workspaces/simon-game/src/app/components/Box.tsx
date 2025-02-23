import React from "react";

type Props = {
  color?: string;
  height?: number;
  isDisabled?: boolean;
  margin?: number;
  onClick?: () => void;
  width?: number;
};

export function Box({
  color = "lightblue",
  height = 100,
  isDisabled = false,
  margin,
  onClick,
  width = 100,
}: Props) {
  return (
    <button
      style={{
        backgroundColor: color,
        height,
        width,
        borderRadius: 20, // rounded corners
        margin, // spaces between boxes
        cursor: isDisabled ? undefined : "pointer",
        border: 0,
      }}
      onClick={isDisabled ? undefined : onClick}
    />
  );
}
