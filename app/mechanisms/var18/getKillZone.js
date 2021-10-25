import getCountDown from "./functions/getCountDown";

export default function getKillZone() {
  let matrix = (function () {
    let temp = [];
    for (let i = 0; i < 64; i++) {
      temp.push(false);
    }
    return temp;
  })();
  let positions = [];
  //Seed pos is the top starting square from the right of the grid
  const seedPos = Math.floor(Math.random() * 64);
  //Get top cluster
  positions = positions.concat(getTopCluster(seedPos));
  //Get bottom cluster
  if (!checkBottomEdge(seedPos)) {
    positions = positions.concat(getBottomCluster(seedPos - 8));
  }

  for (const position of positions) {
    matrix[position] = false;
  }
  return {
    countDown: getCountDown(),
    matrix: matrix,
  };
}

function checkBottomEdge(position) {
  return position < 8;
}
