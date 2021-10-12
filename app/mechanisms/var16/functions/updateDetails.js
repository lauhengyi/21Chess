import clone from "just-clone";

export default function updateDetails(piece, move, occupiedMatrix) {
  //Update occupied Matrix
  let newOccupiedMatrix = clone(occupiedMatrix);
  let newPiece = clone(piece);
  const temp = newOccupiedMatrix[piece.position];
  newOccupiedMatrix[piece.position] = [false, null, null];
  newOccupiedMatrix[move[1]] = temp;

  //Update piece
  newPiece.position = move[1];
  newPiece.perk = null;
  return [newPiece, newOccupiedMatrix];
}
