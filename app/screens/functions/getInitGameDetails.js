function getInitGameDetails(boardLayout) {
  const initialDetails = {
    boardLayout: boardLayout,
    moveables: [null, null],
    clickedSquare: null,
    currentSide: true,
    lastMoved: [null, null, null],
    eatenPieces: [],
    checked: 0,
    stalemated: 0,
    checkmated: 0,
    promotion: null,
  };
  return initialDetails;
}

export default getInitGameDetails;
