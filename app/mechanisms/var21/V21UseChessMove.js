import { useReducer } from "react";
import getPortals from "./functions/portalFunctions/getPortals";
import emptyPortals from "./functions/portalFunctions/emptyPortals";
import getPortalCountDown from "./functions/portalFunctions/getPortalCountDown";

function V21UseChessMove(boardLayout, chessMovesReducer, saved) {
  let initialDetails;
  if (saved) {
    initialDetails = saved.gameDetails;
  } else {
    initialDetails = {
      boardLayout: boardLayout,
      moveables: [null, null],
      clickedSquare: null,
      currentSide: true,
      lastMoved: [null, null, null],
      eatenPieces: [],
      previousBoards: [],
      checked: 0,
      stalemated: 0,
      checkmated: 0,
      repetition: false,
      promotion: null,
      portalDetails: {
        currentPortals: emptyPortals,
        countDown: getPortalCountDown(),
        nextPortals: getPortals(emptyPortals),
      },
    };
  }
  return useReducer(chessMovesReducer, initialDetails);
}

export default V21UseChessMove;
