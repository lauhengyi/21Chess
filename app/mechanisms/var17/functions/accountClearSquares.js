import getEmptyAdjacentPos from "./getEmptyAdjacentPos";

export default function accountClearSquares(newDetails, position) {
  const positions = getEmptyAdjacentPos(position, newDetails.mineMatrix);
  //Account changes for every one of those positions
  for (const adjacentPos of positions) {
    const emptyPositions = getEmptyAdjacentPos(
      adjacentPos,
      newDetails.mineMatrix
    );
    //If position have no surrounding mines
    if (emptyPositions.length) {
      //Clear position
      newDetails.mineMatrix[adjacentPos][1] = true;
      for (const emptyPosition of emptyPositions) {
        accountClearSquares(newDetails, emptyPosition);
      }
    }
  }
}
