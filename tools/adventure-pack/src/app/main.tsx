// TODO: specify the globals via ESLint config
/* global window, document */

import nullthrows from "nullthrows";
import { format as prettierFormat } from "prettier/standalone";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettierPluginTypeScript from "prettier/plugins/typescript";
import React, { useEffect, useId, useState } from "react";
import ReactDOM from "react-dom/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow as syntaxHighlighterStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

declare const ADVENTURE_PACK_COMMIT_HASH: string;

type AdventurePackItem = {
  code: string;
  imports: string[];
  metadata: { name: string };
};

function AdventurePackItemCard({ item }: { item: AdventurePackItem }) {
  return (
    <div>
      <h2>{item.metadata.name}</h2>
      <SyntaxHighlighter
        language="typescript"
        style={syntaxHighlighterStyle}
        showLineNumbers
      >
        {(
          item.imports
            .sort()
            .map((im) => `import ${JSON.stringify(im)};\n`)
            .join("") +
          "\n" +
          item.code
        ).trim()}
      </SyntaxHighlighter>
    </div>
  );
}

function centerTextInComment(text: string): string {
  const left = "/".repeat(Math.max(2, Math.floor((80 - text.length - 2) / 2)));
  const right = "/".repeat(Math.max(0, 80 - text.length - 2 - left.length));
  return `${left} ${text} ${right}`.trim();
}

function Checkbox({
  children,
  isChecked,
  onChange,
}: {
  children: React.ReactNode;
  isChecked: boolean;
  onChange: () => void;
}) {
  const id = useId();
  return (
    <label style={{ display: "block" }}>
      <input type="checkbox" id={id} checked={isChecked} onChange={onChange} />
      {children}
    </label>
  );
}

function App() {
  const [data, setData] = useState<Record<string, AdventurePackItem> | null>(
    null,
  );
  const [error, setError] = useState<Error | null>(null);

  const [selectedItems, setSelectedItems] = useState(new Set<string>());
  const [code, setCode] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("items.json");

        if (!response.ok) {
          throw new Error(`Got status ${response.status} from server!`);
        }

        setData(await response.json());
      } catch (err) {
        // TODO: maybe avoid cast
        setError(err as Error);
      }
    })();
  }, []);

  useEffect(() => {
    if (data == null) {
      return;
    }

    let isActive = true;

    (async () => {
      const formattedCode = await prettierFormat(
        centerTextInComment("BEGIN ADVENTURE PACK CODE") +
          "\n" +
          `// Adventure Pack commit ${ADVENTURE_PACK_COMMIT_HASH}\n` +
          `// Running at: ${window.location.href}\n\n` +
          Array.from(selectedItems)
            .map((name) => data[name].code)
            .join("\n\n") +
          "\n" +
          centerTextInComment("END ADVENTURE PACK CODE") +
          "\n",
        {
          parser: "typescript",
          plugins: [prettierPluginESTree, prettierPluginTypeScript],
        },
      );
      isActive && setCode(formattedCode);
    })();

    return () => {
      isActive = false;
    };
  }, [data, selectedItems]);

  return (
    <>
      {error && <pre>{error.stack}</pre>}
      {data && (
        <>
          <h1>Build Your Pack</h1>
          <div
            style={{
              border: "1px solid black",
              maxHeight: 500,
              overflowY: "scroll",
            }}
          >
            {Object.values(data)
              .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name))
              .map((item) => (
                <Checkbox
                  key={item.metadata.name}
                  isChecked={selectedItems.has(item.metadata.name)}
                  onChange={() => {
                    if (selectedItems.has(item.metadata.name)) {
                      setSelectedItems(
                        new Set(
                          [...selectedItems].filter(
                            (name) => name !== item.metadata.name,
                          ),
                        ),
                      );
                    } else {
                      setSelectedItems(
                        new Set([...selectedItems, item.metadata.name]),
                      );
                    }
                  }}
                >
                  {item.metadata.name}
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
            <SyntaxHighlighter
              language="typescript"
              style={syntaxHighlighterStyle}
              showLineNumbers
            >
              {code}
            </SyntaxHighlighter>
          </div>
          <h1>Code Browser</h1>
          <div
            style={{
              border: "1px solid black",
              maxHeight: 500,
              overflowY: "scroll",
            }}
          >
            {Object.values(data)
              .sort((a, b) => a.metadata.name.localeCompare(b.metadata.name))
              .map((item) => (
                <AdventurePackItemCard key={item.metadata.name} item={item} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

window.addEventListener(
  "load",
  () => {
    ReactDOM.createRoot(
      nullthrows(
        document.getElementById("main"),
        'No element with id "main" in the DOM!',
      ),
    ).render(<App />);
  },
  { once: true },
);
