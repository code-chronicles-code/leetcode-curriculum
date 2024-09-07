import type { Link } from "mdast";
import prettier from "prettier";

import { only } from "@code-chronicles/util/only";

const remarkPromise = import("remark");
const uninstUtilVisitPromise = import("unist-util-visit");

export async function processWriteUpForLeetCode(
  markdown: string,
): Promise<string> {
  const [{ remark }, { visit: visitSyntaxTree }] = await Promise.all([
    remarkPromise,
    uninstUtilVisitPromise,
  ]);

  const unformattedProcessedMarkdown = String(
    await remark()
      .use(() => (tree) => {
        visitSyntaxTree(tree, "link", (node: Link) => {
          if (node.children.length !== 1) {
            return;
          }

          const linkedContentNode = only(node.children);
          if (
            linkedContentNode.type !== "text" ||
            !/^\s*View\s+submission(?:\s+on\s+LeetCode)?\s*$/i.test(
              linkedContentNode.value,
            )
          ) {
            return;
          }

          linkedContentNode.value = "View submission";
        });

        visitSyntaxTree(tree, "link", (node: Link) => {
          if (node.children.length !== 1) {
            return;
          }

          const linkedContentNode = only(node.children);
          if (
            linkedContentNode.type !== "text" ||
            !/^\s*View\s+this\s+write-up\s+on\s+LeetCode\s*$/i.test(
              linkedContentNode.value,
            )
          ) {
            return;
          }

          linkedContentNode.value = "View this Write-up on GitHub TODO";
        });
      })
      .process(markdown),
  );

  const formattedProcesedMarkdown = await prettier.format(
    unformattedProcessedMarkdown,
    { parser: "markdown" },
  );

  return formattedProcesedMarkdown;
}
