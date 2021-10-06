import React from "react";
import { View, StyleSheet, Text } from "react-native";
import PromotionSelector from "../../var0/components/AdditionalInfo_Components/PromotionSelector";
import getPiece from "../../../../mechanisms/primaryFunctions/getPiece";
import V6GetPlayers from "../functions/V6GetPlayers";
import ToggleMenuButton from "../../var0/components/AdditionalInfo_Components/ToggleMenuButton";
import checkStatus from "../../../functions/checkStatus";
import colorPalatte from "../../../../config/colorPalatte";

function V6AdditionalInfo(props) {
  const currentGame = props.gameDetails.currentGame;
  const {
    checked,
    checkmated,
    stalemated,
    repetition,
    boardLayout,
    promotion,
    currentSide,
  } = props.gameDetails[currentGame];
  const options = props.options;
  const position = props.position;
  const timeLeft = props.timeLeft;
  //Create Player and Opponent
  const [player, opponent] = V6GetPlayers(
    props.position,
    options,
    currentSide,
    currentGame
  );
  const flipped = options.isFlipped && position === "top" ? true : false;
  const statement = getStatement();

  //Get promoting, where promoting = [whether additional Info will include promoting, side of piece promoting]
  const promoting = checkPromoting();

  //Get whether the button is present
  const isButton = promoting[0] || position === "bottom" ? false : true;

  const styles = getStyles(props.settings, colorPalatte);
  return (
    //Include statement
    <View style={styles.container}>
      <View style={flipped ? styles.isFlipped : styles.notFlipped}>
        <View style={styles.statementContainer}>
          {statement && <Text style={styles.statement}>{statement}</Text>}
          {promoting[0] && (
            <PromotionSelector
              flipped={options.isFlipped}
              side={promoting[1]}
              onAction={(action) => props.onAction(action)}
              promotion={promotion}
              settings={props.settings}
            />
          )}
        </View>
      </View>
      {isButton && (
        <View style={styles.buttonContainer}>
          <ToggleMenuButton
            onButtonPress={() => props.onButtonPress()}
            settings={props.settings}
            varNum={props.varNum}
          />
        </View>
      )}
    </View>
  );

  function getStatement() {
    let statement = null;
    const opponentsName = options.mode ? "Player " + opponent[0] : "Computer";

    const sc = "You are checked";
    const scm = "You are checkmated";
    const ss = "You are stalemated";
    const st = "You lost by timeout";
    const pc = opponentsName + " checked";
    const pcm = opponentsName + " checkmated";
    const ps = opponentsName + " stalemated";
    const pt = opponentsName + " timeout";
    const r = "Threefold repetition";

    //Check opponent for check and checkmate
    if (checkStatus(opponent[1], checked)) {
      statement = pc;
      if (checkmated) {
        statement = pcm;
      }
    }

    //Check opponent for stalemate
    if (checkStatus(opponent[1], stalemated)) {
      statement = ps;
    }

    //Check opponent for timeout
    if (checkStatus(opponent[1], timeLeft.timeout)) {
      statement = pt;
    }

    //Check self for check and checkmate
    if (checkStatus(player[1], checked)) {
      statement = sc;
      if (checkmated) {
        statement = scm;
      }
    }

    //Check self for stalemate
    if (checkStatus(player[1], stalemated)) {
      statement = ss;
    }

    //Check self for timeout
    if (checkStatus(player[1], timeLeft.timeout)) {
      statement = st;
    }

    //Check for repetition of board
    if (repetition) {
      statement = r;
    }

    //Remove statement if statement is from the top and autoTurn is not turned off
    if (position === "top" && (options.isAutoturn || options.mode === 0)) {
      statement = null;
    }
    return statement;
  }

  function checkPromoting() {
    let promoting = [false, null];
    if (promotion) {
      const promotingPiece = getPiece(promotion, boardLayout);
      if (promotingPiece.side === opponent[1]) {
        promoting = [true, promotingPiece.side];
      }
    }
    return promoting;
  }
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return (styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 22,
    },

    isFlipped: {
      transform: [{ rotate: "180deg" }],
      flex: 1,
    },

    notFlipped: {
      flex: 1,
    },

    statementContainer: {
      flex: 1,
      justifyContent: "center",
    },

    statement: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
      alignSelf: "flex-end",
    },
  }));
}

export default V6AdditionalInfo;
