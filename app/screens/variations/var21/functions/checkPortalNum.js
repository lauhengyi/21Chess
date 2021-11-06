import clone from "just-clone";

//Returns whether the position should have a portal number
export default function checkPortalNum(position, portalDetails) {
  const portal1 = portalDetails.nextPortals[0];
  if (position === portal1.positions1[portal1.positions1.length - 1]) {
    return true;
  }

  const portal2 = portalDetails.nextPortals[1];
  if (position === portal2.positions1[0]) {
    return true;
  }
  return false;
}
