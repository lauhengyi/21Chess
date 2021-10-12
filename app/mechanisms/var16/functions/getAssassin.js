import updateDetails from "./updateDetails";

export default function getAssassin(
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
  //Remove captures for useable moves
  const useableMoves = firstMoves.filter((move) => move.length === 2);
  let secondMoves = [];
  for (let move of useableMoves) {
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

  //isolate captures
  secondMoves = secondMoves.filter((move) => move.length === 3);

  return firstMoves.concat(secondMoves);
}
