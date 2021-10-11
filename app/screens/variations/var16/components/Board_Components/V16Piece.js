import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Clickable from "../../../../components/Clickable";
import getPiece from "../../../../../mechanisms/primaryFunctions/getPiece";
import colorPalatte from "../../../../../config/colorPalatte";
import getPieceText from "../../../../functions/getPieceText";

function V16Piece(props) {
  // Passing down constants
  const options = props.options;
  const settings = props.settings;
  const boardLayout = props.gameDetails.boardLayout;
  const piece = getPiece(props.pieceId, boardLayout);
  const currentSide = props.gameDetails.currentSide;
  const currentOrientation = props.boardOrientation;
  const computerTurn =
    options.mode === 0 && currentSide !== options.startingSide;

  //Get styles
  const styles = getStyle();

  const pieceText = getPieceText(piece, settings.theme);
  const levelText = piece.level;

  if (
    !computerTurn &&
    currentSide === piece.side &&
    !props.isMoveableOnSquare
  ) {
    return (
      <View style={styles.container}>
        <Clickable
          onPress={() => {
            props.onAction({ type: "pieceClick", pieceId: props.pieceId });
          }}
        >
          <Text style={styles.piece}>{pieceText}</Text>
        </Clickable>
        <View style={styles.idContainer}>
          <Text style={styles.subText}>{levelText}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.piece}>{pieceText}</Text>
        <View style={styles.idContainer}>
          <Text style={styles.subText}>{levelText}</Text>
        </View>
      </View>
    );
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
    container: {
      transform: [{ rotate: rotateAmount }],
    },
    piece: {
      fontFamily: "Meri",
      fontSize: 38,
      color: colors.piece,
    },

    idContainer: {
      height: 0,
      position: "absolute",
      left: 0,
      top: 0,
      margin: -2,
    },

    subText: {
      fontFamily: "ELM",
      fontSize: 10,
      color: colors.piece,
    },
  });
  return styles;
}

export default V16Piece;
