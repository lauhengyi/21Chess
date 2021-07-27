import React, { useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../../../config/colors";
import SquaresRow from "./SquaresRow";

function Board(props) {
  const options = props.options;
  // Mapping rows
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];

  const boardOrientation = getOrientation(options);

  return (
    //make board
    <View style={boardOrientation}>
      <View style={styles.board}>
        {rows.map((index) => (
          <SquaresRow
            key={index}
            index={index}
            gameDetails={props.gameDetails}
            options={props.options}
            onAction={(action) => props.onAction(action)}
          />
        ))}
      </View>
    </View>
  );

  function getOrientation(options) {
    let boardOrientation = options.startingSide
      ? styles.orientWhite
      : styles.orientBlack;
    if (options.isAutoturn) {
      boardOrientation = props.gameDetails.currentSide
        ? styles.orientWhite
        : styles.orientBlack;
    }
    return boardOrientation;
  }
}

const styles = StyleSheet.create({
  orientWhite: {},

  orientBlack: {
    transform: [{ rotate: "180deg" }],
  },

  board: {
    flexDirection: "column-reverse",
    color: colors.white,
  },
});

export default Board;
