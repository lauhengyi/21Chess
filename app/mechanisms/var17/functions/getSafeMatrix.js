import getSquareNumber from "./getSquareNumber";
import getUnclearedAdjacentPos from "./getUnclearedAdjacentSquares";

//Return a list of safe positions
export default function getSafeMatrix(mineMatrix) {
  //if position is cleared, it is safe
  let clearedPositions = [];
  for (let i = 0; i < 64; i++) {
    if (mineMatrix[i][1]) {
      clearedPositions.push(i);
    }
  }
  let dangerPositions = [];
  let safeUncleared = [];
  //Add uncleared squares to dangerPositions if squareNum === no. of adjacent uncleared squares
  for (const position of clearedPositions) {
    const squareNum = getSquareNumber(position, mineMatrix);
    if (squareNum !== 0) {
      let uncleared = getUnclearedAdjacentPos(position, mineMatrix);
      if (uncleared.length === squareNum) {
        dangerPositions = dangerPositions.concat(uncleared);
      } else {
        for (const unclearedPosition of uncleared) {
          if (!dangerPositions.includes(unclearedPosition)) {
            safeUncleared.push(unclearedPosition);
          }
        }
      }
    }
  }
  const safePositions = clearedPositions.concat(safeUncleared);
  let matrix = [];
  for (let i = 0; i < 64; i++) {
    matrix.push(false);
  }
  for (const safePos of safePositions) {
    matrix[safePos] = true;
  }

  return matrix;
}
