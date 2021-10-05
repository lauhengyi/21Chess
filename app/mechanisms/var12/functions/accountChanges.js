import getPiece from "../../primaryFunctions/getPiece";

function accountChanges(index, board, occupiedMatrix) {
  //Check self first
  if (
    checkSurroundings(occupiedMatrix, board[index].position, board[index].side)
  ) {
    board[index].side = !board[index].side;
    occupiedMatrix[board[index].position][1] = board[index].side;
  }

  checkChanges(board[index].position, board, occupiedMatrix);
}

//Check surrounding pieces
//Returns [board, occupiedMatrix]
function checkChanges(position, board, occupiedMatrix) {
  const surroundingDetails = getSurroundingDetails(position, occupiedMatrix);

  for (const surrounding of surroundingDetails) {
    const [, surroundingSide, surroundingId] = surrounding;
    const surroundingPos = getPiece(surroundingId, board).position;
    if (checkSurroundings(occupiedMatrix, surroundingPos, surroundingSide)) {
      //Get index
      let index;
      for (let i = 0; i < board.length; i++) {
        if (board[i].position === surroundingPos) {
          index = i;
          break;
        }
      }
      board[index].side = !board[index].side;
      occupiedMatrix[board[index].position][1] = board[index].side;
      checkChanges(surroundingPos, board, occupiedMatrix);
      break;
    }
  }
}

//Return whether it should change side
function checkSurroundings(occupiedMatrix, position, side) {
  const surroundingDetails = getSurroundingDetails(position, occupiedMatrix);
  //Count of number of opposing pieces
  let count = 0;
  //Count of number of allied pieces
  let antiCount = 0;
  for (const surrounding of surroundingDetails) {
    const [, surroundingSide] = surrounding;
    if (surroundingSide === !side) {
      count += 1;
    } else {
      antiCount += 1;
    }
  }

  return count > 2 && count > antiCount;
}

function getSurroundingDetails(position, occupiedMatrix) {
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

  const filteredPositions = positions.filter(
    (position) => occupiedMatrix[position][0]
  );

  const surroundingDetails = filteredPositions.map(
    (position) => occupiedMatrix[position]
  );

  return surroundingDetails;
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

export default accountChanges;
