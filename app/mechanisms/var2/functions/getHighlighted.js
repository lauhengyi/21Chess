function getHighlighted(kingPosition, side) {
  let highlighted = [];

  let front;
  let leftD;
  let rightD;
  if (side) {
    front = kingPosition + 8;
    leftD = kingPosition + 7;
    rightD = kingPosition + 9;
  } else {
    front = kingPosition - 8;
    leftD = kingPosition - 9;
    rightD = kingPosition - 7;
  }
  //Add highlights
  highlighted.push(front);

  //Add left highlights
  if (!((kingPosition + 8) % 8 === 0)) {
    highlighted.push(leftD);
  }

  //Add right highlights
  if (!((kingPosition + 9) % 8 === 0)) {
    highlighted.push(rightD);
  }
  return highlighted;
}

export default getHighlighted;
