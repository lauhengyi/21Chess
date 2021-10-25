import getClusterSize from "./getClusterSize";
import getYAxis from "./getYAxis";

export default function getTopCluster(seedPos, increment, edgeDetection) {
  const clusterSize = getClusterSize();
  let currentPos = seedPos;
  let positions = [];
  if (clusterSize === 0) {
    return positions;
  }
  for (let i = 0; i < clusterSize; i++) {
    positions = positions.concat(getYAxis(currentPos, 8, checkTopEdge));
    if (edgeDetection(currentPos)) {
      return positions;
    } else {
      currentPos += increment;
    }
  }
  return positions;
}

function checkTopEdge(position) {
  return position > 55;
}
