import { useReducer } from "react";
import pieceChooserReducer from "./functions/pieceChooserReducer";

function usePieceChooser() {
  const initialState = {
    side: true,
    highlighted: [],
    boardLayout: [],
    whiteLeft: {
      p: 8,
      r: 2,
      n: 2,
      b: 2,
      q: 1,
      k: 1,
    },
    blackLeft: {
      p: 8,
      r: 2,
      n: 2,
      b: 2,
      q: 1,
      k: 1,
    },
    completed: false,
    error: "",
  };
  return useReducer(pieceChooserReducer, initialState);
}

export default usePieceChooser;
