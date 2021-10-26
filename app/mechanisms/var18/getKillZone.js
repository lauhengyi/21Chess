import getCountDown from "./functions/getCountDown";
import getTopCluster from "./functions/getTopCluster";
import getBottomCluster from "./functions/getBottomCluster";

export default function getKillZone() {
  let matrix = (function () {
    let temp = [];
    for (let i = 0; i < 64; i++) {
      temp.push(false);
    }
    return temp;
  })();
  let positions = [];
  //Seed pos is the top left hand corner of a 2x2 starting seed grid
  const seedPos = Math.floor(Math.random() * 64);
  //Get top left cluster
  positions = positions.concat(getTopCluster(seedPos, -1, checkLeftEdge));
  //Get top right
  if (!checkRightEdge(seedPos)) {
    positions = positions.concat(getTopCluster(seedPos + 1, 1, checkRightEdge));
  }
  //Get bottom left cluster
  if (!checkBottomEdge(seedPos)) {
    positions = positions.concat(
      getBottomCluster(seedPos - 8, -1, checkLeftEdge)
    );
  }
  //Get bottom right
  if (!checkBottomEdge(seedPos) && !checkRightEdge(seedPos)) {
    positions = positions.concat(
      getBottomCluster(seedPos - 7, 1, checkRightEdge)
    );
  }

  for (const position of positions) {
    matrix[position] = true;
  }
  return {
    countDown: getCountDown(),
    matrix: matrix,
  };
}

function checkBottomEdge(position) {
  return position < 8;
}

function checkLeftEdge(position) {
  return (position + 8) % 8 === 0;
}

function checkRightEdge(position) {
  return (position + 9) % 8 === 0;
}
