import { describe, expect, it } from "@jest/globals";

import { traversePreOrderNAry } from "./index.ts";

type Node = { val: number; children: Node[] };

describe("traversePreOrderNAry", () => {
  it("yields nothing for null/undefined root", () => {
    expect([...traversePreOrderNAry(null)]).toStrictEqual([]);
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
        {
          val: 2,
          children: [
            { val: 5, children: [] },
            { val: 6, children: [] },
          ],
        },
        { val: 3, children: [] },
        {
          val: 4,
          children: [{ val: 7, children: [] }],
        },
      ],
    };
    expect([...traversePreOrderNAry(root)].map((n) => n.val)).toStrictEqual([
      1, 2, 5, 6, 3, 4, 7,
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
