import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as syntaxHighlighterStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

type Props = {
  children: React.ComponentProps<typeof SyntaxHighlighter>["children"];
};

export function HighlightedCode({ children }: Props) {
  return (
    <SyntaxHighlighter
      customStyle={{ fontSize: "12px", margin: 0 }}
      language="typescript"
      showLineNumbers
      style={syntaxHighlighterStyle}
    >
      {children}
    </SyntaxHighlighter>
  );
}
