//Returns portals which is a list of 2 portal objects
/* portal = {
    type: 'x' or 'y'
    direction: true, false
    positions1: list of positions with the portal
    positions2: list of positions with the portal
} */
export default function getPortals(portals) {
  const minLength = 1;
  const portalLength = minLength + Math.floor(Math.random() * 4);
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
  //Mirror image the positions of portal2
  portal2.positions1.reverse();
  portal2.positions2.reverse();

  return [portal1, portal2];
}

function getPortal(length) {
  const portalType = Math.random() > 0.5 ? "x" : "y";
  const portalDirection = Math.random() > 0.5;
  const [positions1, positions2] = getPositions(length, portalType);
  return {
    type: portalType,
    direction: portalDirection,
    positions1: positions1,
    positions2: positions2,
  };
}

function getPositions(length, type) {
  let positions1 = [];
  let positions2 = [];
  //Create different positions for different types
  if (type === "y") {
    const x = Math.floor(Math.random() * 7);
    const y = Math.floor(Math.random() * (8 - length));
    const seedPos = y * 8 + x;
    for (let i = 0; i < length; i++) {
      positions1.push(seedPos + 8 * i);
      positions2.push(seedPos + 1 + 8 * i);
    }
  } else {
    const x = Math.floor(Math.random() * (8 - length));
    const y = Math.floor(Math.random() * 7);
    const seedPos = y * 8 + x;
    for (let i = 0; i < length; i++) {
      positions1.push(seedPos + i);
      positions2.push(seedPos + i + 8);
    }
  }
  return [positions1, positions2];
}

function checkPortalCollision(portal1, portal2) {
  if (portal1.type !== portal2.type) {
    return false;
  }
  for (const position of portal1.positions1) {
    if (portal2.positions1.includes(position)) {
      return true;
    }
  }
  return false;
}
