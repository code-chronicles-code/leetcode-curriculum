import React from "react";

export function Checkbox({
  children,
  isChecked,
  onChange,
}: {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: () => void;
}) {
  return (
    <label style={{ display: "block" }}>
      <input type="checkbox" checked={isChecked} onChange={onChange} />
      {children}
    </label>
  );
}
