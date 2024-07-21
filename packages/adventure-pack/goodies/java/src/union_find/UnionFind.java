package union_find;

public class UnionFind {

  private final int[] parent;
  private final int[] componentSize;
  private int components;

  public UnionFind(int n) {
    parent = new int[n];
    componentSize = new int[n];
    components = n;
    for (int i = 0; i < n; ++i) {
      parent[i] = i;
      componentSize[i] = 1;
    }
  }

  public boolean union(int a, int b) {
    int pa = find(a);
    int pb = find(b);

    if (pa == pb) {
      return false;
    }

    if (componentSize[pa] > componentSize[pb]) {
      componentSize[pa] += componentSize[pb];
      parent[pb] = parent[pa];
    } else {
      componentSize[pb] += componentSize[pa];
      parent[pa] = parent[pb];
    }
    --components;

    return true;
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

  public int components() {
    return components;
  }
}
