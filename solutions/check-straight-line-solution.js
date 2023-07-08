/**
 * LeetCode problem # 1232, 'Check If It Is a Straight Line'
 * https://leetcode.com/problems/check-if-it-is-a-straight-line
 */

function haveTheSameSlope([ax, ay], [bx, by], [cx, cy]) {
  /*
    Need to check: (by - ay) / (bx - ax) === (cy - by) / (cx - bx)
    Crossmultiplying to avoid using division 
  */

  return (by - ay) * (cx - bx) === (cy - by) * (bx - ax);
}

function checkStraightLine(coordinates) {
  for (let i = 2; i < coordinates.length; ++i) {
    if (!haveTheSameSlope(coordinates[0], coordinates[1], coordinates[i])) {
      return false;
    }
  }
  return true;
}
