import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TimeText from "../../../components/TimeText";
import getTimeControlText from "../../../functions/getTimeControlText";
import getPlayers from "../../../functions/getPlayers";
import colorPalatte from "../../../../config/colorPalatte";
import getPieceText from "../../../functions/getPieceText";
import TurnsIndicator from "./TurnsIndicator";

function V7StatsBar(props) {
  const styles = getStyles(props.settings, colorPalatte);
  const { currentSide, eatenPieces } = props.gameDetails;
  const { p1TimeLeft, p2TimeLeft, isRunning } = props.timeLeft;
  const options = props.options;
  //Get players
  const [player, opponent] = getPlayers(props.position, options, currentSide);
  //Get header text
  const headerText = getHeaderText();

  //Get time relavant details
  const timeDetails = options.timeDetails;
  const isChessClock = timeDetails.isChessClock;
  const isClockActive = player[0] === isRunning ? true : false;
  const timeLeft = player[0] === 1 ? p1TimeLeft : p2TimeLeft;
  const timeControlText =
    player[0] === 1
      ? getTimeControlText(
          timeDetails.p1Time,
          timeDetails.p1Increment,
          timeDetails.p1Delay
        )
      : getTimeControlText(
          timeDetails.p2Time,
          timeDetails.p2Increment,
          timeDetails.p2Delay
        );

  const eatenFiltered = eatenPieces.filter(
    (eatenPiece) => eatenPiece[0] === player[1]
  );
  const eatenList = eatenFiltered.map((eatenPiece) => [
    eatenPiece[1].id,
    getPieceText(eatenPiece[1], props.settings.theme),
  ]);

  //Find statsbar type (only for top statsBar, whether it is normal or supplementary)
  let statsBarType = "normal";
  if (props.position === "top" && (options.isAutoturn || options.mode === 0)) {
    statsBarType = "supplementary";
  }

  {
    if (statsBarType === "normal") {
      return (
        <View style={styles.container}>
          <View
            style={
              props.position === "top"
                ? styles.statsBarTop
                : styles.statsBarBottom
            }
          >
            <TurnsIndicator
              gameDetails={props.gameDetails}
              settings={props.settings}
            />
            <View style={styles.topStatsSection}>
              <View style={styles.headerContainer}>
                <Text style={styles.header}>{headerText}</Text>
                <Text style={styles.subHeader}>Captured Pieces:</Text>
              </View>
              {isChessClock && (
                <View style={styles.timeSection}>
                  <View
                    style={
                      isClockActive
                        ? styles.timeTextContainerActive
                        : styles.timeTextContainerInactive
                    }
                  >
                    <TimeText value={timeLeft} style={styles.timeText} />
                  </View>
                  <Text style={styles.timeControlText}>{timeControlText}</Text>
                </View>
              )}
            </View>
            <View style={styles.eatenContainer}>
              {eatenList.map((eaten) => (
                <Text key={eaten[0]} style={styles.eatenPiece}>
                  {eaten[1]}
                </Text>
              ))}
            </View>
          </View>
        </View>
      );
    } else if (statsBarType === "supplementary") {
      return (
        <View style={styles.container}>
          <View style={styles.topStatsSection}>
            <Text style={styles.subHeader}>Pieces Lost:</Text>
            {isChessClock && (
              <View style={styles.timeSection}>
                <View
                  style={
                    isClockActive
                      ? styles.timeTextContainerActive
                      : styles.timeTextContainerInactive
                  }
                >
                  <TimeText value={timeLeft} style={styles.timeText} />
                </View>
                <Text style={styles.timeControlText}>{timeControlText}</Text>
              </View>
            )}
          </View>
          <View style={styles.eatenContainer}>
            {eatenList.map((eaten) => (
              <Text key={eaten[0]} style={styles.eatenPiece}>
                {eaten[1]}
              </Text>
            ))}
          </View>
        </View>
      );
    }
  }

  function getHeaderText() {
    let headerText;
    //Form header statements
    const opponentsName = options.mode ? "Player " + opponent[0] : "Computer";
    headerText =
      player[1] === currentSide ? "Your Turn" : opponentsName + "' s Turn";

    //Consider autoturn, where it does not show Your Turn
    if (options.isAutoturn) {
      headerText = "Player " + player[0] + "' s Turn";
    }

    return headerText;
  }
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      height: 115,
      width: "100%",
      backgroundColor: colors.secondary,
      padding: 10,
    },

    topStatsSection: {
      flexDirection: "row",
      justifyContent: "space-between",
    },

    statsBarTop: {
      flex: 1,
      transform: [{ rotate: "180deg" }],
    },

    statsBarBottom: {},

    headerContainer: {},

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 30,
      color: colors.black,
    },

    subHeader: {
      fontFamily: "ELM",
      fontSize: 18,
      color: colors.black,
    },

    eatenContainer: {
      flexDirection: "row",
    },

    eatenPiece: {
      fontFamily: "Meri",
      fontSize: 20,
      color: colors.black,
    },

    timeSection: {
      justifyContent: "center",
      alignItems: "center",
    },

    timeTextContainerActive: {
      borderWidth: 5,
      borderColor: colors.grey1,
      width: 100,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },

    timeTextContainerInactive: {
      borderWidth: 5,
      borderColor: colors.grey1,
      elevation: 50,
      backgroundColor: colors.grey2,
      justifyContent: "center",
    },

    timeText: {
      fontFamily: "ELM",
      fontSize: 18,
      paddingHorizontal: 5,
      color: colors.black,
    },

    timeControlText: {
      fontFamily: "ELM",
      fontSize: 12,
      color: colors.black,
    },
  });
}
export default V7StatsBar;
