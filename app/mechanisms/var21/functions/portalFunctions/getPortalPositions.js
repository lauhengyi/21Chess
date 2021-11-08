//returns a list of [enteringPortalPos, leavingPortalPos, leavingPortal]
export default function getPortalPositions(portalNum, portalSide, portals) {
  const enteringPortalPos = portals[portalNum][portalSide];
  const enteringDirection = portals[portalNum].direction;

  const oppSide = portalSide === "positions1" ? "positions2" : "positions1";
  const leavingNum = portalNum === 1 ? 0 : 1;

  const leavingPortal = portals[leavingNum];
  const leavingSide =
    leavingPortal.direction === enteringDirection ? oppSide : portalSide;
  const leavingPortalPos = portals[leavingNum][leavingSide];
  return [enteringPortalPos, leavingPortalPos, leavingPortal];
}
