import updateDetails from "./updateDetails";

export default function getSpeedster(
  piece,
  occupiedMatrix,
  createPieceDataCalculator
) {
  //Find current moves
  const firstMoves = createPieceDataCalculator(
    { ...piece, perk: null },
    occupiedMatrix
  ).moves;
  let secondMoves = [];
  for (let move of firstMoves) {
    //Modify move to occupied matrix
    const [newPiece, newOccupiedMatrix] = updateDetails(
      piece,
      move,
      occupiedMatrix
    );
    secondMoves = secondMoves.concat(
      createPieceDataCalculator(newPiece, newOccupiedMatrix).moves
    );
  }
  //Remove duplicates
  secondMoves = [...new Set(secondMoves)];

  //Remove moves in the same position as the piece
  secondMoves = secondMoves.filter((move) => move[1] !== piece.position);
  //Remove captures
  secondMoves = secondMoves.filter((move) => move.length === 2);

  return firstMoves.concat(secondMoves);
}
