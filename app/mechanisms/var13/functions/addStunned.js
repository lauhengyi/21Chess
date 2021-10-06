function addStunned(position, side, board) {
  //Add stunned
  const positions = getPositions(position);
  for (let i = 0; i < board.length; i++) {
    const piece = board[i];
    if (
      piece.side === side &&
      positions.includes(piece.position) &&
      checkKing(piece.position, side, board)
    ) {
      board[i].stunned = true;
    }
  }
}

//Return whether king is behind piece
function checkKing(position, side, board) {
  const king = board.find((piece) => piece.type === "k" && piece.side === side);
  const kingRow = Math.floor(king.position / 8);
  const pieceRow = Math.floor(position / 8);
  if (side) {
    return pieceRow > kingRow;
  } else {
    return kingRow > pieceRow;
  }
}

function getPositions(position) {
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
  return positions;
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

export default addStunned;
