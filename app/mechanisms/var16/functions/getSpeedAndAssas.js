import updateDetails from "./updateDetails";

export default function getSpeedAndAssas(
  piece,
  occupiedMatrix,
  AorD,
  createPieceDataCalculator
) {
  //To get whether attacks or defended
  const modifier = AorD ? "moves" : "defended";
  //Find current moves
  const firstMoves = createPieceDataCalculator(
    { ...piece, perk: null },
    occupiedMatrix
  )[modifier];
  let secondMoves = [];
  for (let move of firstMoves) {
    //Modify move to occupied matrix
    const [newPiece, newOccupiedMatrix] = updateDetails(
      piece,
      move,
      occupiedMatrix
    );
    secondMoves = secondMoves.concat(
      createPieceDataCalculator(newPiece, newOccupiedMatrix)[modifier]
    );
  }
  //Remove duplicates
  secondMoves = [...new Set(secondMoves)];
  if (piece.perk === "s") {
    //Remove captures
    secondMoves = secondMoves.filter((move) => move.length === 2);
  } else if (piece.perk === "a") {
    //Isolate captures
    secondMoves = secondMoves.filter((move) => move.length === 3);
  }

  return firstMoves.concat(secondMoves);
}
