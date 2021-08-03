import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Board from "./var0_Components/Board";
import StatsBar from "./var0_Components/StatsBar";
import useChessMove from "../../mechanisms/useChessMove";
import AdditionalInfo from "./var0_Components/AdditionalInfo";
import layout from "./boardLayouts/var0Layout";
import colors from "../../config/colors";
import changeTimeValue from "../functions/changeTimeValue";

function Var0({ route, navigation }) {
  const options = route.params.options;
  const initialBoard = layout;
  const timeDetails = options.timeDetails;
  const [gameDetails, chessActions] = useChessMove(initialBoard);
  console.log(timeDetails.p1Delay);
  //Initialise time left
  const timeLeft = useTime();

  return (
    <>
      <View style={styles.statsBarTop}>
        <StatsBar
          gameDetails={gameDetails}
          timeLeft={timeLeft}
          position={"top"}
          options={options}
        />
      </View>
      <View style={styles.boardContainer}>
        <AdditionalInfo
          gameDetails={gameDetails}
          position={"top"}
          options={options}
          onAction={chessActions}
        />
        <Board
          gameDetails={gameDetails}
          options={options}
          onAction={chessActions}
        />
        <AdditionalInfo
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
          onAction={chessActions}
        />
      </View>
      <View style={styles.statsBarBottom}>
        <StatsBar
          timeLeft={timeLeft}
          gameDetails={gameDetails}
          position={"bottom"}
          options={options}
        />
      </View>
    </>
  );

  function useTime() {
    const [p1TimeLeft, setP1TimeLeft] = useState(timeDetails.p1Time);
    const [p2TimeLeft, setP2TimeLeft] = useState(timeDetails.p2Time);
    const [count, setCount] = useState(0);
    const timer = useRef();
    useEffect(() => {
      if (options.startingSide === gameDetails.currentSide) {
        const timeLeft = changeTimeValue(p1TimeLeft, "-1");
        timer.current = setInterval(() => setP1TimeLeft(timeLeft), 1000);
      } else {
        const timeLeft = changeTimeValue(p2TimeLeft, "-1");
        timer.current = setInterval(() => setP2TimeLeft(timeLeft), 1000);
      }
      console.log("in");
      return () => clearInterval(timer.current);
    }, [gameDetails.currentSide]);
    return { p1TimeLeft: p1TimeLeft, p2TimeLeft: p2TimeLeft };
  }
}

const styles = StyleSheet.create({
  boardContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  statsBarBottom: {
    flexDirection: "row",
  },

  statsBarTop: {
    marginTop: 50,
  },
});

export default Var0;
