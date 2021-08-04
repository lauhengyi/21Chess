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
    const timer = useRef();
    useEffect(() => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      const player = getPlayer();
      const setTime = player === 1 ? setP1TimeLeft : setP2TimeLeft;
      //Decrement time

      timer.current = setInterval(
        () => setTime((timeLeft) => changeTimeValue(timeLeft, "-1")),
        1000
      );
      return () => clearInterval(timer.current);
    }, [gameDetails.currentSide]);
    return { p1TimeLeft: p1TimeLeft, p2TimeLeft: p2TimeLeft };

    function getPlayer() {
      if (options.startingSide === gameDetails.currentSide) {
        return 1;
      } else {
        return 2;
      }
    }
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
