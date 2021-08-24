import React from "react";
import { View, StyleSheet } from "react-native";
import Square from "./Square";
import SquareLayout from "./SquareLayout";

function SquaresRow(props) {
  // Passing down constants
  return (
    <View style={styles.row}>
      {SquareLayout[props.index].map((squares) => (
        <Square
          key={squares.position}
          position={squares.position}
          color={squares.color}
          gameDetails={props.gameDetails}
          options={props.options}
          onAction={(action) => props.onAction(action)}
          boardOrientation={props.boardOrientation}
          settings={props.settings}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
});

export default SquaresRow;
