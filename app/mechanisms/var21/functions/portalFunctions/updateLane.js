import checkIsEnteringPortals from "./checkIsEnteringPortals";
import getLeavingPortalandPos from "./getLeavingPortalandPos";
import getRotation from "./getRotation";
import rotateIncrement from "./rotateIncrement";

//return [leavingPosition, leavingIncrement]
export default function updateLane(position, increment, portals) {
  const [entering, enteringNum, enteringSide] = checkIsEnteringPortals(
    position,
    increment,
    portals
  );
  if (!entering) {
    return [position, increment];
  }
  const [leavingPortal, leavingPos] = getLeavingPortalandPos(
    position,
    enteringNum,
    enteringSide,
    portals
  );

  const rotation = getRotation(portals[enteringNum], leavingPortal);
  const leavingIncrement = rotateIncrement(increment, rotation);
  console.log({ leavingPos, leavingIncrement });
  return [leavingPos, leavingIncrement];
}
