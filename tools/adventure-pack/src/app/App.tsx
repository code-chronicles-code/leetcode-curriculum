import React, { useEffect } from "react";

import { Checkbox } from "./Checkbox";
import { GoodyCard } from "./GoodyCard";
import { HighlightedCode } from "./HighlightedCode";
import { fetchGoodies } from "./fetchGoodies";
import { useMergedCode } from "./useMergedCode";
import { useAppState } from "./useAppState";

function Column({
  children,
  flex,
  title,
}: {
  children: React.ReactNode;
  flex?: string;
  title: string;
}) {
  return (
    <div style={{ flex, overflow: "scroll" }}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

type Props = {
  commitHash: string;
};

export function App({ commitHash }: Props) {
  const [state, dispatch] = useAppState();

  useEffect(() => {
    fetchGoodies().then(
      (goodiesByLanguage) =>
        dispatch({ type: "load-goodies-success", goodiesByLanguage }),
      (error) => dispatch({ type: "load-goodies-error", error }),
    );
  }, []);

  const goodies = state.goodiesByLanguage?.[state.activeLanguage] ?? null;
  const selectedGoodies = state.equippedGoodiesByLanguage[state.activeLanguage];

  const code = useMergedCode({
    commitHash,
    goodies,
    selectedGoodies,
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          width: "60%",
        }}
      >
        <h1 className="courgette-regular" style={{ display: "inline" }}>
          {"Adventure Pack"}
        </h1>
        <span>
          {"Essential equipment for your next TypeScript quest on LeetCode " +
            String.fromCodePoint(0x1f9d9)}
        </span>
      </div>
      {state.goodiesByLanguageError && (
        <pre>{state.goodiesByLanguageError.stack}</pre>
      )}
      <div
        style={{
          flex: "1 1 0",
          overflow: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "12px",
          padding: "12px",
        }}
      >
        <Column title="Pick Your Goodies" flex="0 0 auto">
          {Object.values(goodies ?? {}).map((goody) => (
            <Checkbox
              key={goody.name}
              isChecked={selectedGoodies.has(goody.name)}
              onChange={() =>
                dispatch({
                  name: goody.name,
                  type: selectedGoodies.has(goody.name)
                    ? "unequip-goody"
                    : "equip-goody",
                })
              }
            >
              {goody.name}
            </Checkbox>
          ))}
        </Column>
        <Column title="Browse" flex="1 1 0">
          {Object.values(goodies ?? {}).map((goody) => (
            <GoodyCard key={goody.name} goody={goody} />
          ))}
        </Column>

        <Column title="Code" flex="1 1 0">
          <HighlightedCode>{code}</HighlightedCode>
        </Column>
      </div>
    </div>
  );
}
