import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import { useEffect, useState } from "react";

import { centerTextInComment } from "./centerTextInComment";
import type { Goody } from "./fetchGoodies";

function mergeCode({
  commitHash,
  goodies,
  selectedGoodies,
}: {
  commitHash: string;
  goodies: Record<string, Goody>;
  selectedGoodies: ReadonlySet<string>;
}): Promise<string> {
  return prettierFormat(
    centerTextInComment("BEGIN ADVENTURE PACK CODE") +
      "\n" +
      `// Adventure Pack commit ${commitHash}\n` +
      `// Running at: ${window.location.href}\n\n` +
      Array.from(selectedGoodies)
        .map((name) => goodies[name].code)
        .join("\n\n") +
      "\n" +
      centerTextInComment("END ADVENTURE PACK CODE") +
      "\n",
    {
      parser: "typescript",
      plugins: [prettierPluginESTree, prettierPluginTypeScript],
    },
  );
}

export function useMergedCode({
  commitHash,
  goodies,
  selectedGoodies,
}: {
  commitHash: string;
  goodies: Record<string, Goody> | null;
  selectedGoodies: ReadonlySet<string>;
}): string {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (goodies == null) {
      return;
    }

    let isActive = true;

    mergeCode({ commitHash, goodies, selectedGoodies }).then((mergedCode) => {
      isActive && setCode(mergedCode);
    });

    return () => {
      isActive = false;
    };
  }, [goodies, selectedGoodies]);

  return code;
}
