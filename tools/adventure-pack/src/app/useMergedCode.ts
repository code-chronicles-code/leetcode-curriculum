import { useEffect, useState } from "react";

// TODO: split util by type of util so importing the main package doesn't pull in node:fs
import { promiseIdleCallback } from "@code-chronicles/util/src/promiseIdleCallback";

import { type Data, mergeCode } from "./mergeCode";

export function useMergedCode({
  commitHash,
  goodies,
  language,
  equippedGoodies,
}: Omit<Data, "goodies"> & { goodies: Data["goodies"] | null }): string {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (goodies == null) {
      return;
    }

    let isActive = true;

    promiseIdleCallback(() => {
      isActive &&
        setCode(
          mergeCode({
            commitHash,
            goodies,
            language,
            equippedGoodies,
          }),
        );
    });

    return () => {
      isActive = false;
    };
  }, [commitHash, goodies, language, equippedGoodies]);

  return code;
}
