import React from "react";
import { View, StyleSheet } from "react-native";
import V13Square from "./V13Square";
import SquareLayout from "../../../var0/components/Board_Components/SquareLayout";

function V13SquaresRow(props) {
  // Passing down constants
  return (
    <View style={styles.row}>
      {SquareLayout[props.index].map((squares) => (
        <V13Square
          key={squares.position}
          position={squares.position}
          colorId={squares.color}
          boardOrientation={props.boardOrientation}
          gameDetails={props.gameDetails}
          options={props.options}
          onAction={(action) => props.onAction(action)}
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

export default V13SquaresRow;
