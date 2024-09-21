import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as syntaxHighlighterStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyButton } from "./CopyButton.tsx";
import type { Language } from "../Language.ts";

// Cross-reference with https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
type HighlighterLanguage =
  | "java"
  | "javascript"
  | "kotlin"
  | "python"
  | "typescript";

const LANGUAGE_TO_HIGHLIGHTER_LANGUAGE: Record<Language, HighlighterLanguage> =
  {
    java: "java",
    javascript: "javascript",
    kotlin: "kotlin",
    python3: "python",
    typescript: "typescript",
  };

type Props = {
  children: string;

  language: Language;
};

export function HighlightedCode({ children, language }: Props) {
  return (
    <div className="highlighted-code">
      <CopyButton textToCopy={children} />
      <SyntaxHighlighter
        customStyle={{ fontSize: "12px", margin: 0 }}
        language={LANGUAGE_TO_HIGHLIGHTER_LANGUAGE[language]}
        showLineNumbers
        style={syntaxHighlighterStyle}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
