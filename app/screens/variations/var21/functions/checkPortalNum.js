//Returns whether the position should have a portal number
export default function checkPortalNum(position, portalDetails) {
  let portal = portalDetails.nextPortals[0];
  if (position === portal.positions1[portal.positions1.length - 1]) {
    return true;
  }

  portal = portalDetails.nextPortals[1];
  if (position === portal.positions1[0]) {
    return true;
  }
  return false;
}
