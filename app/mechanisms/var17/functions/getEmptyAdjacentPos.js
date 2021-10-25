import getAdjacentPos from "../../primaryFunctions/getAdjacentPos";

export default function getEmptyAdjacentPos(position, mineMatrix) {
  const positions = getAdjacentPos(position);

  return positions.filter(
    (position) => !mineMatrix[position][0] && !mineMatrix[position][1]
  );
}
