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

  @Test
  public void componentsTracked() {
  	UnionFind uf = new UnionFind(3);
	assertEquals(
		3,
		uf.components(),
		"There should be 3 components to start with."
	);

	uf.union(0,1);
	assertEquals(
		2,
		uf.components(),
		"There should be 2 components after an union of 0 and 1."
	);

	uf.union(0,2);
	assertEquals(
		1,
		uf.components(),
		"There should be 1 component now that we've connected all."
	);
  }
}
