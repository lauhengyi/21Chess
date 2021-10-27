import getAdjacentPos from "../../primaryFunctions/getAdjacentPos";

//Heals pieces of opposing side after move is made
export default function healPieces(newDetails) {
  for (const piece of newDetails.boardLayout) {
    if (piece.type === "b" && piece.side !== newDetails.currentSide) {
      const positions = getAdjacentPos(piece.position);
      for (const surroundingPiece of newDetails.boardLayout) {
        if (
          surroundingPiece.side !== newDetails.currentSide &&
          positions.includes(surroundingPiece.position)
        ) {
          surroundingPiece.health += 1;
          //Doesn't heal above max
          surroundingPiece.health =
            surroundingPiece.health > 3 ? 3 : surroundingPiece.health;
        }
      }
    }
  }
}
