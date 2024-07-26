import { useEffect, useState } from "react";

import { promiseIdleCallback } from "@code-chronicles/util/promiseIdleCallback";

import { type Data, mergeCode } from "./mergeCode";

export function useMergedCode({
  commitHash,
  equippedGoodies,
  goodies,
  language,
}: Omit<Data, "goodies"> & { goodies: Data["goodies"] | null }): string {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (goodies == null) {
      return undefined;
    }

    let isActive = true;

    promiseIdleCallback(() => {
      isActive &&
        setCode(
          mergeCode({
            commitHash,
            equippedGoodies,
            goodies,
            language,
          }),
        );
    });

    return () => {
      isActive = false;
    };
  }, [commitHash, equippedGoodies, goodies, language]);

  return code;
}
