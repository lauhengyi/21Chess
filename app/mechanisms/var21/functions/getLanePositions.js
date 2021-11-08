import accountCollidedPiece from "./accountCollidedPiece";
import updateLane from "./portalFunctions/updateLane";

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

function checkEdge(position, increment) {
  switch (increment) {
    case 1:
      return checkRightEdge(position);
    case -1:
      return checkLeftEdge(position);
    case 8:
      return checkTopEdge(position);
    case -8:
      return checkBottomEdge(position);
    case 9:
      return checkTopEdge(position) || checkRightEdge(position);
    case 7:
      return checkTopEdge(position) || checkLeftEdge(position);
    case -9:
      return checkBottomEdge(position) || checkLeftEdge(position);
    case -7:
      return checkBottomEdge(position) || checkRightEdge(position);
  }
}
function checkTopEdge(position) {
  return position > 55;
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}

function checkRightEdge(position) {
  return (position + 9) % 8 === 0;
}
