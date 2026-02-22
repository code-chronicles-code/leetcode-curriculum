import { describe, expect, it } from "@jest/globals";

import { traversePreOrderNAry } from "./index.ts";

type Node = { val: number; children: Node[] };

describe("traversePreOrderNAry", () => {
  it("returns empty for null root", () => {
    expect([...traversePreOrderNAry(null)]).toStrictEqual([]);
  });

  it("returns empty for undefined root", () => {
    expect([...traversePreOrderNAry(undefined)]).toStrictEqual([]);
  });

  it("yields root only for single node", () => {
    const root: Node = { val: 1, children: [] };
    expect([...traversePreOrderNAry(root)].map((n) => n.val)).toStrictEqual([
      1,
    ]);
  });

  it("visits parent before children", () => {
    const root: Node = {
      val: 1,
      children: [
        { val: 2, children: [] },
        { val: 3, children: [] },
      ],
    };
    expect([...traversePreOrderNAry(root)].map((n) => n.val)).toStrictEqual([
      1, 2, 3,
    ]);
  });

  it("traverses deeper trees in pre-order", () => {
    const root: Node = {
      val: 1,
      children: [
        {
          val: 2,
          children: [
            { val: 4, children: [] },
            { val: 5, children: [] },
          ],
        },
        { val: 3, children: [] },
      ],
    };
    expect([...traversePreOrderNAry(root)].map((n) => n.val)).toStrictEqual([
      1, 2, 4, 5, 3,
    ]);
  });
});
