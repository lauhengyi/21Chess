import React from "react";
import { Text, Pressable } from "react-native";
import { getPiece } from "../../../mechanisms/normalChess";

function Piece(props) {
  // Passing down constants
  const options = props.options;
  const boardLayout = props.gameDetails.boardLayout;
  const piece = getPiece(props.pieceId, boardLayout);
  const currentSide = props.gameDetails.currentSide;
  const currentOrientation = getBoardOrientation();
  //Check piece orientation
  let rotateAmount = "0deg";
  if (currentOrientation && options.isFlipped) {
    //starting white
    if (piece.side === false) {
      rotateAmount = "180deg";
    }
  }
  if (currentOrientation === false) {
    rotateAmount = "180deg";
    if (options.isFlipped && piece.side === true) {
      rotateAmount = "0deg";
    }
  }

  //Linking each piece's type to their corresponding chess font
  const PieceKey = {
    true: {
      p: "p",
      r: "r",
      n: "n",
      b: "b",
      q: "q",
      k: "k",
    },

    false: {
      p: "o",
      r: "t",
      n: "m",
      b: "v",
      q: "w",
      k: "l",
    },
  };

  if (currentSide === piece.side) {
    return (
      <Pressable
        onPress={() =>
          props.onAction({ type: "pieceClick", pieceId: props.pieceId })
        }
      >
        <Text
          style={{
            fontFamily: "Meri",
            fontSize: 40,
            transform: [{ rotate: rotateAmount }],
          }}
        >
          {PieceKey[piece.side][piece.type]}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Text
        style={{
          fontFamily: "Meri",
          fontSize: 40,
          transform: [{ rotate: rotateAmount }],
        }}
      >
        {PieceKey[piece.side][piece.type]}
      </Text>
    );
  }
  function getBoardOrientation() {
    let boardOrientation = options.startingSide ? true : false;
    if (options.isAutoturn) {
      boardOrientation = props.gameDetails.currentSide ? true : false;
    }
    return boardOrientation;
  }
}

export default Piece;
