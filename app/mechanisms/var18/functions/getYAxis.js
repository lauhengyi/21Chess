import getClusterSize from "./getClusterSize";

export default function getYAxis(seedPos, increment, edgeDetection) {
  const length = getClusterSize();
  let currentPos = seedPos;
  let positions = [];
  for (let i = 0; i < length; i++) {
    positions.push(currentPos);
    if (edgeDetection(currentPos)) {
      return positions;
    } else {
      currentPos += increment;
    }
  }
  return positions;
}
