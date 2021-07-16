import React, { useEffect } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import colors from "../../../config/colors";
import SquaresRow from "./SquaresRow";

function Board(props) {
  // Mapping rows
  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    //make board
    <View style={styles.board}>
      {rows.map((index) => (
        <SquaresRow
          key={index}
          index={index}
          gameDetails={props.gameDetails}
          onAction={(action) => props.onAction(action)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  board: {
    flexDirection: "column-reverse",
    color: colors.white,
  },
});

export default Board;
