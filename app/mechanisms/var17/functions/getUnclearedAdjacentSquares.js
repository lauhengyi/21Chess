export default function getUnclearedAdjacentPos(position, mineMatrix) {
  //list possible positions
  let u = position + 8;
  let d = position - 8;
  let l = position - 1;
  let r = position + 1;
  let ul = position + 7;
  let ur = position + 9;
  let dl = position - 9;
  let dr = position - 7;

  //compile moves
  let positions = [];
  //considering up moves
  if (!checkTopEdge(position)) {
    positions.push(u);
    if (!checkLeftEdge(position)) {
      positions.push(ul);
    }
    if (!checkRightEdge(position)) {
      positions.push(ur);
    }
  }
  //consider down moves
  if (!checkBottomEdge(position)) {
    positions.push(d);
    if (!checkLeftEdge(position)) {
      positions.push(dl);
    }
    if (!checkRightEdge(position)) {
      positions.push(dr);
    }
  }

  //consider side moves
  if (!checkLeftEdge(position)) {
    positions.push(l);
  }
  if (!checkRightEdge(position)) {
    positions.push(r);
  }

  return positions.filter((position) => !mineMatrix[position][1]);
}

function checkTopEdge(position) {
  return position > 55;
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
