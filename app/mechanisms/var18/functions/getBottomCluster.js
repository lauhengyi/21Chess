import getClusterSize from "./getClusterSize";

export default function getBottomCluster(seedPos) {
  const clusterSize = getClusterSize();
  let currentPos = seedPos;
  let positions = [];
  for (let i = 0; i < clusterSize; i++) {
    if (checkLeftEdge(currentPos)) {
      return positions;
    } else {
      positions = positions.concat(getYAxis(currentPos, -8, checkBottomEdge));
      currentPos += 1;
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
