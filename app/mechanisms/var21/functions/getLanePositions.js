import accountCollidedPiece from "./accountCollidedPiece";
import updateLane from "./portalFunctions/updateLane";
import checkEdge from "./checkEdge";

export default function getLanePositions(
  startingPos,
  piece,
  occupiedMatrix,
  AorD,
  increment,
  portals
) {
  let positions = [];
  let position = startingPos;
  while (true) {
    //Check for extreme left
    [position, increment] = updateLane(position, increment, portals);

    if (checkEdge(position, increment)) {
      break;
    }

    position += increment;

    //Check for blocking pieces
    let collided;
    [positions, collided] = accountCollidedPiece(
      position,
      piece,
      positions,
      occupiedMatrix,
      AorD
    );
    if (collided) {
      break;
    }
  }
  return positions;
}
