import getClusterSize from "./getClusterSize";

export default function getYAxis(seedPos, increment, edgeDetection) {
  const length = getClusterSize();
  let currentPos = seedPos;
  let positions = [];
  for (let i = 0; i < length; i++) {
    if (edgeDetection(currentPos)) {
      return positions;
    } else {
      positions.push(currentPos);
      currentPos += increment;
    }
  }
  return positions;
}
