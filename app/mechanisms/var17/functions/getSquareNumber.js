import getOccupiedAdjacentPos from "./getOccupiedAdjacentPos";

//Return null if not suppose to have number or if its a mine
export default function getSquareNumber(position, mineMatrix) {
  //Return null if not cleared
  if (mineMatrix[position][1] === false || mineMatrix[position][0]) {
    return null;
  }

  const positions = getOccupiedAdjacentPos(position, mineMatrix);
  return positions.length;
}
