class Solution:
    def checkStraightLine(self, coordinates: List[List[int]]) -> bool:
        x1, y1 = coordinates[0]
        x2, y2 = coordinates[1]
        dx = x2 - x1
        dy = y2 - y1

        prev = dy * x1 - dx * y1
        for x, y in coordinates:
            if dy * x - dx * y != prev:
                return False

        return True
