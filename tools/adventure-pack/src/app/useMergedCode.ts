import { useEffect, useState } from "react";

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

    mergeCode({ commitHash, goodies, language, equippedGoodies }).then(
      (mergedCode) => {
        isActive && setCode(mergedCode);
      },
    );

    return () => {
      isActive = false;
    };
  }, [commitHash, goodies, language, equippedGoodies]);

  return code;
}
