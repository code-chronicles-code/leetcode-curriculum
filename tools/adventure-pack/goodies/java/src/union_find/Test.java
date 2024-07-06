package union_find;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

class UnionFindTest {

  @Test
  public void unionsElements() {
    UnionFind uf = new UnionFind(2);
    assertEquals(
      false,
      uf.areConnected(0, 1),
      "Elements should not be connected initially."
    );

    uf.union(0, 1);
    assertEquals(
      true,
      uf.areConnected(0, 1),
      "Elements should be connected after a union."
    );
  }
}
