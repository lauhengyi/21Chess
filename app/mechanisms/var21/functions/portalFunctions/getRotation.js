//degrees of rotation clockwise
export default function getRotation(enteringPortal, leavingPortal) {
  if (enteringPortal.type === leavingPortal.type) {
    if (enteringPortal.direction === leavingPortal.direction) {
      return 180;
    } else {
      return 0;
    }
  } else {
    if (enteringPortal.direction === leavingPortal.direction) {
      if (enteringPortal.type === "y") {
        return 90;
      } else {
        return 270;
      }
    } else {
      if (enteringPortal.type === "y") {
        return 270;
      } else {
        return 90;
      }
    }
  }
}
