import React from "react";
import { View, StyleSheet } from "react-native";
import V18Square from "./V18Square";
import SquareLayout from "../../../var0/components/Board_Components/SquareLayout";

function V18SquaresRow(props) {
  // Passing down constants
  return (
    <View style={styles.row}>
      {SquareLayout[props.index].map((squares) => (
        <V18Square
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

export default V18SquaresRow;
