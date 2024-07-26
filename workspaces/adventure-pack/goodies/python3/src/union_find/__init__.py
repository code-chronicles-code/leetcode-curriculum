class UnionFind:

    def __init__(self, n: int):
        self.parents = list(range(n))

        self.component_size = [1] * n
        self.components = n

    def find(self, component) -> int:
        if self.parents[component] != component:
            self.parents[component] = self.find(self.parents[component])

        return self.parents[component]

    def union(self, c1: int, c2: int) -> bool:
        parent1, parent2 = self.find(c1), self.find(c2)
        if parent1 == parent2:
            return False

        if self.component_size[parent2] > self.component_size[parent1]:
            parent1, parent2 = parent2, parent1

        self.parents[parent2] = parent1
        self.component_size[parent1] += self.component_size[parent2]
        self.components -= 1

        return True
