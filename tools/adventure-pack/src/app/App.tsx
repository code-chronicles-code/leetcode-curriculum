import immutableUpdate from "immutability-helper";
import React, { useEffect, useState } from "react";

import { Checkbox } from "./Checkbox";
import { GoodyCard } from "./GoodyCard";
import { HighlightedCode } from "./HighlightedCode";
import { fetchGoodies, type Goody } from "./fetchGoodies";
import { useMergedCode } from "./useMergedCode";

type Props = {
  commitHash: string;
};

export function App({ commitHash }: Props) {
  const [goodies, setGoodies] = useState<Record<string, Goody> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchGoodies().then(setGoodies, setError);
  }, []);

  const [selectedGoodies, setSelectedGoodies] = useState<ReadonlySet<string>>(
    new Set(),
  );

  const code = useMergedCode({ commitHash, goodies, selectedGoodies });

  return (
    <>
      {error && <pre>{error.stack}</pre>}
      {goodies && (
        <>
          <h1>Pick Your Goodies</h1>
          <div
            style={{
              border: "1px solid black",
              maxHeight: 500,
              overflowY: "scroll",
            }}
          >
            {Object.values(goodies).map((goody) => (
              <Checkbox
                key={goody.name}
                isChecked={selectedGoodies.has(goody.name)}
                onChange={() =>
                  setSelectedGoodies((set) =>
                    immutableUpdate(
                      set,
                      set.has(goody.name)
                        ? { $remove: [goody.name] }
                        : { $add: [goody.name] },
                    ),
                  )
                }
              >
                {goody.name}
              </Checkbox>
            ))}
          </div>
          <h1>Code</h1>
          <div
            style={{
              border: "1px solid black",
              maxHeight: 500,
              overflowY: "scroll",
            }}
          >
            <HighlightedCode>{code}</HighlightedCode>
          </div>
          <h1>Code Browser</h1>
          <div
            style={{
              border: "1px solid black",
              maxHeight: 500,
              overflowY: "scroll",
            }}
          >
            {Object.values(goodies).map((goody) => (
              <GoodyCard key={goody.name} goody={goody} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
