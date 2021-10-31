//Returns portals which is a list of 2 portal objects
/* portal = {
    type: 'x' or 'y'
    direction: true, false
    positions: list of positions with the portal
} */
export default function getPortals(portals) {
  const minLength = 1;
  const portalLength = minLength + Math.floor(Math.random() * 5);
  let portal1 = getPortal(portalLength);
  while (
    checkPortalCollision(portals[0], portal1) ||
    checkPortalCollision(portals[1], portal1)
  ) {
    portal1 = getPortal(portalLength);
  }

  let portal2 = getPortal(portalLength);
  while (
    checkPortalCollision(portal1, portal2) ||
    checkPortalCollision(portals[0], portal2) ||
    checkPortalCollision(portals[1], portal2)
  ) {
    portal2 = getPortal(portalLength);
  }
  return [portal1, portal2];
}

function getPortal(length) {
  const portalType = Math.random() > 0.5 ? "x" : "y";
  const portalDirection = Math.random() > 0.5;
  const positions = getPositions(length, portalType, portalDirection);
  return { type: portalType, direction: portalDirection, positions: positions };
}

function getPositions(length, type, direction) {
  let positions = [];
  //Create different positions for different types
  if (type === "y") {
    const range = length * 8;
    const seedPos = Math.floor(Math.random() * range);
    for (let i = 0; i < length; i++) {
      positions.push(seedPos + 8 * i);
    }
  } else {
    const x = Math.floor(Math.random() * (8 - length));
    const y = Math.floor(Math.random() * 8);
    const seedPos = y * 8 + x;
    for (let i = 0; i < length; i++) {
      positions.push(seedPos + i);
    }
  }

  //Create different positions for different directions
  if (direction === false) {
    positions.reverse();
  }
  return positions;
}

function checkPortalCollision(portal1, portal2) {
  if (portal1.type !== portal2.type) {
    return false;
  }
  for (const position of portal1.positions) {
    return portal2.positions.includes(position);
  }
}
