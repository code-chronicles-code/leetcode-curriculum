import React, { useCallback, useState } from "react";

type Props = {
  textToCopy: string;
};

export function CopyButton({ textToCopy }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      // TODO: consider edge cases such as user clicks again within 2s or component is unmounted with pending setTimeout
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy text", e);
    }
  }, [textToCopy]);

  return (
    <button className="copy-button" onClick={handleCopy}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
