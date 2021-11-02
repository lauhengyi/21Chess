import getPortalCountDown from "./getPortalCountDown";
import getPortals from "./getPortals";

export default function updatePortalDetails(portalDetails) {
  portalDetails.countDown--;
  if (portalDetails.countDown === 0) {
    portalDetails.currentPortals = portalDetails.nextPortals;
    portalDetails.nextPortals = getPortals(portalDetails.currentPortals);
    portalDetails.countDown = getPortalCountDown();
  }
}
