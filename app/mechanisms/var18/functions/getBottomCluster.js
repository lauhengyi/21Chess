import getClusterSize from "./getClusterSize";
import getYAxis from "./getYAxis";

export default function getBottomCluster(seedPos, increment, edgeDetection) {
  const clusterSize = getClusterSize();
  let currentPos = seedPos;
  let positions = [];
  if (clusterSize === 0) {
    return positions;
  }
  for (let i = 0; i < clusterSize; i++) {
    positions = positions.concat(getYAxis(currentPos, -8, checkBottomEdge));
    if (edgeDetection(currentPos)) {
      return positions;
    } else {
      currentPos += increment;
    }
  }

  return positions;
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}
