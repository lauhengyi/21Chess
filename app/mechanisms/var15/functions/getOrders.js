import getOccupiedMatrix from "../../primaryFunctions/getOccupiedMatrix";
import getPositions from "./getPositions";
//Function return a list of orders that can be made with the current side
export default function getOrders(gameDetails, type) {
  //Look for possible positions
  const kingPos = (function () {
    for (const piece of gameDetails.boardLayout) {
      if (piece.type === "k" && piece.side === gameDetails.currentSide) {
        return piece.position;
      }
    }
  })();
  const occupiedMatrix = getOccupiedMatrix(gameDetails.boardLayout);
  let positions = getPositions(kingPos, occupiedMatrix);
  if (type === "p") {
    if (gameDetails.currentSide) {
      positions = positions.filter((position) => position < 56);
    } else {
      positions = positions.filter((position) => position > 7);
    }
  }
  const orders = positions.map((position) => [position, type]);
  return orders;
}
