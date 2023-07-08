class Solution {
public:
    bool checkStraightLine(vector<vector<int>>& coordinates) {
        int n = coordinates.size();
        if (n <= 2) return true;

        int dx1 = coordinates[1][0] - coordinates[0][0];
        int dy1 = coordinates[1][1] - coordinates[0][1];


        for (int i = 2; i < n; ++i) {
            int dx2 = coordinates[i][0] - coordinates[i - 1][0];
            int dy2 = coordinates[i][1] - coordinates[i - 1][1];

            if (y1 * x2 != x1 * y2) return false;
        }
        return true;
    }
};
