import { useEffect } from "react";
import makeBoard from "./functions/makeBoard";

function useBoardMaker(options, choosingDetails, choosingActions) {
  useEffect(() => {
    async function createBoard() {
      if (choosingDetails.side !== options.startingSide) {
        await makeBoard(choosingDetails, choosingActions);
      }
    }
    createBoard();
  }, [choosingDetails.side]);
}

export default useBoardMaker;
