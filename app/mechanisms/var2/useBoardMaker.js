import { useEffect } from "react";
import makeBoard from "./functions/makeBoard";

function useBoardMaker(options, choosingDetails, choosingActions) {
  useEffect(() => {
    if (choosingDetails.side !== options.startingSide) {
      makeBoard(choosingDetails, choosingActions);
    }
  }, [choosingDetails.side]);
}

export default useBoardMaker;
