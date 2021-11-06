//returns [whether piece is entering a portal, portalNum, portalSide]
export default function checkIsEnteringPortals(position, increment, portals) {
  //For portal 0
  let [entering, portalSide] = checkIsEnteringPortal(
    position,
    increment,
    portals[0]
  );
  if (entering) {
    return [true, 0, portalSide];
  }

  //For portal 1
  [entering, portalSide] = checkIsEnteringPortal(
    position,
    increment,
    portals[1]
  );
  if (entering) {
    return [true, 1, portalSide];
  }

  return [false, null, null];
}

//returns [whether piece is entering a portal, portalSide]
function checkIsEnteringPortal(position, increment, portal) {
  const [adajacent, portalSide] = checkPortal(position, portal);
  if (adajacent) {
    const oppSide = portalSide === "positions1" ? "positions2" : "positions1";
    const newPosition = position + increment;
    if (portal[oppSide].includes(newPosition)) {
      return [true, portalSide];
    }
  }
  return [false, null];
}

//returns [whether position is next to portal, portalSide]
function checkPortal(position, portal) {
  if (portal.positions1.includes(position)) {
    return [true, "positions1"];
  } else if (portal.positions2.includes(position)) {
    return [true, "positions2"];
  } else {
    return [false, null];
  }
}
