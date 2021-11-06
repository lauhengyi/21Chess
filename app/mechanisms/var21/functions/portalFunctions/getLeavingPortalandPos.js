import getPortalPositions from "./getPortalPositions";

//positions must be part of portals already
export default function getLeavingPortalandPos(
  position,
  portalNum,
  portalSide,
  portals
) {
  console.log("in");
  const [enteringPortalPositions, leavingPortalPositions, leavingPortal] =
    getPortalPositions(portalNum, portalSide, portals);
  console.log("out");
  const portalIndex = enteringPortalPositions.indexOf(position);

  return [leavingPortal, leavingPortalPositions[portalIndex]];
}
