export default function getLanePositions(
  startingPos,
  occupiedMatrix,
  AorD,
  increment,
  edgeCheck
) {
  let positions = [];
  let position = startingPos;
  while (true) {
    //Check for extreme left
    if (edgeCheck(position)) {
      break;
    }

    position += increment;

    //Check for blocking pieces
    let collided;
    [positions, collided] = accountCollidedPiece(
      i,
      piece,
      left,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  return positions;
}
