import React from "react";
import colors from "../../../../config/colors";
import { Text, Pressable, StyleSheet } from "react-native";
import { getPiece } from "../../../../mechanisms/normalChess";

function Piece(props) {
  // Passing down constants
  const options = props.options;
  const boardLayout = props.gameDetails.boardLayout;
  const piece = getPiece(props.pieceId, boardLayout);
  const currentSide = props.gameDetails.currentSide;
  const currentOrientation = props.boardOrientation;

  //Get styles
  const pieceStyle = getStyle();

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
        <Text style={pieceStyle}>{PieceKey[piece.side][piece.type]}</Text>
      </Pressable>
    );
  } else {
    return <Text style={pieceStyle}>{PieceKey[piece.side][piece.type]}</Text>;
  }

  function getStyle() {
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

    return createStyles(rotateAmount);
  }
}

function createStyles(rotateAmount) {
  const styles = StyleSheet.create({
    piece: {
      fontFamily: "Meri",
      fontSize: 40,
      transform: [{ rotate: rotateAmount }],
    },
  });
  return styles.piece;
}

export default Piece;
