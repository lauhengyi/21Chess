import React from "react";
import { Text, Pressable } from "react-native";
import { getPiece } from "../../../mechanisms/normalChess";

function Piece(props) {
  // Passing down constants
  const boardLayout = props.gameDetails.boardLayout;
  const piece = getPiece(props.pieceId, boardLayout);
  const currentSide = props.gameDetails.currentSide;
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
        <Text style={{ fontFamily: "Meri", fontSize: 40 }}>
          {PieceKey[piece.side][piece.type]}
        </Text>
      </Pressable>
    );
  } else {
    return (
      <Text style={{ fontFamily: "Meri", fontSize: 40 }}>
        {PieceKey[piece.side][piece.type]}
      </Text>
    );
  }
}

export default Piece;
