import React from "react";
import { Text, StyleSheet } from "react-native";
import Clickable from "../../../../components/Clickable";
import getPiece from "../../../../../mechanisms/primaryFunctions/getPiece";
import colorPalatte from "../../../../../config/colorPalatte";
import V1GetPieceText from "../../functions/V1GetPieceText";

function V1Piece(props) {
  // Passing down constants
  const options = props.options;
  const settings = props.settings;
  const boardLayout = props.gameDetails.boardLayout;
  const piece = getPiece(props.pieceId, boardLayout);
  const pieceMap = props.gameDetails.pieceMap;
  const currentSide = props.gameDetails.currentSide;
  const currentOrientation = props.boardOrientation;
  const computerTurn =
    options.mode === 0 && currentSide !== options.startingSide;

  //Get styles
  const pieceStyle = getStyle();

  const pieceText = V1GetPieceText(piece, pieceMap, settings.theme);

  if (!computerTurn && currentSide === piece.side) {
    return (
      <Clickable
        onPress={() => {
          props.onAction({ type: "pieceClick", pieceId: props.pieceId });
        }}
      >
        <Text style={pieceStyle}>{pieceText}</Text>
      </Clickable>
    );
  } else {
    return <Text style={pieceStyle}>{pieceText}</Text>;
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

    return createStyles(rotateAmount, settings, colorPalatte);
  }
}

function createStyles(rotateAmount, settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    piece: {
      fontFamily: "Meri",
      fontSize: 38,
      transform: [{ rotate: rotateAmount }],
      color: colors.piece,
    },
  });
  return styles.piece;
}

export default V1Piece;
