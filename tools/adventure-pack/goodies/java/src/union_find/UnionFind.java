package union_find;

public class UnionFind {

  private final int[] parent;

  public UnionFind(int n) {
    parent = new int[n];
    for (int i = 0; i < n; ++i) {
      parent[i] = i;
    }
  }

  public void union(int a, int b) {
    int pa = find(a);
    int pb = find(b);

    parent[pa] = parent[pb];
  }

  public int find(int a) {
    if (parent[a] == a) {
      return a;
    }

    return parent[a] = find(parent[a]);
  }

  public boolean areConnected(int a, int b) {
    return find(a) == find(b);
  }
}
