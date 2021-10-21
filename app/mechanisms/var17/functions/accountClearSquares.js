import getEmptyAdjacentPos from "./getEmptyAdjacentPos";
import getOccupiedAdjacentPos from "./getOccupiedAdjacentPos";

export default function accountClearSquares(mineMatrix, position) {
  const positions = getEmptyAdjacentPos(position, mineMatrix);
  //Account changes for every one of those positions
  for (const adjacentPos of positions) {
    //Clear all adajcent positions
    mineMatrix[adjacentPos][1] = true;
    const emptyPositions = getEmptyAdjacentPos(adjacentPos, mineMatrix);
    //If position have no surrounding mines
    if (getOccupiedAdjacentPos(adjacentPos, mineMatrix).length === 0) {
      //Clear position
      mineMatrix[adjacentPos][1] = true;
      for (const emptyPosition of emptyPositions) {
        accountClearSquares(mineMatrix, emptyPosition);
      }
    }
  }
}
