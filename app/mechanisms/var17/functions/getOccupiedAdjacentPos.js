import getAdjacentPos from "../../primaryFunctions/getAdjacentPos";

export default function getOccupiedAdjacentPos(position, mineMatrix) {
  const positions = getAdjacentPos(position);
  return positions.filter((position) => mineMatrix[position][0]);
}
