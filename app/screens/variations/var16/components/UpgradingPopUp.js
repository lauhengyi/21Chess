import React, { useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import getPiece from "../../../../mechanisms/primaryFunctions/getPiece";
import getPieceText from "../../../functions/getPieceText";
import colorPalatte from "../../../../config/colorPalatte";
import PerkButton from "./PerkButton";
import Clickable from "../../../components/Clickable";

export default function UpgradingPopUp(props) {
  const { gameDetails, options, chessActions } = props;
  const piece = getPiece(gameDetails.upgradable, gameDetails.boardLayout);
  const player = options.startingSide === gameDetails.currentSide ? 1 : 2;
  const [headerText1, headerText2] = getHeaderText(piece, player);
  const pieceText = getPieceText(piece, props.settings.theme);

  const [clickedPerk, setPerk] = useState(null);
  const [perkTitle, perkDesc] = getPerkText(clickedPerk);
  let perksList = getPerksList(piece);
  let perksList2 = [];
  if (perksList.length > 3) {
    perksList2 = perksList.splice(3, 2);
  }
  const styles = getStyles(props.settings, player, options, colorPalatte);
  return (
    <Modal visible={gameDetails.upgradable !== null} animationType={"fade"}>
      <View style={styles.background}>
        <Text style={styles.header}>{headerText1}</Text>
        <Text style={styles.header}>{headerText2}</Text>
        <Text style={styles.piece}>{pieceText}</Text>
        <View style={styles.perksContainer}>
          {perksList.map((type) => (
            <PerkButton
              key={type}
              clickedPerk={clickedPerk}
              onPress={setPerk}
              type={type}
              settings={props.settings}
            />
          ))}
        </View>
        <View style={styles.perksContainer2}>
          {perksList2.map((type) => (
            <PerkButton
              key={type}
              clickedPerk={clickedPerk}
              onPress={setPerk}
              type={type}
              settings={props.settings}
            />
          ))}
        </View>
        <View style={styles.perkDescriptionContainer}>
          <Text style={styles.perkTitle}>{perkTitle}</Text>
          <Text style={styles.perkDesc}>{perkDesc}</Text>
        </View>
        <Clickable
          onPress={() => chessActions({ type: "upgrade", perk: clickedPerk })}
        >
          <Text style={clickedPerk ? styles.select : styles.unSelect}>
            Select
          </Text>
        </Clickable>
      </View>
    </Modal>
  );
}

function getHeaderText(piece, player) {
  const pieceName = (function () {
    switch (piece.type) {
      case "p":
        return "Pawn";
      case "r":
        return "Rook";
      case "n":
        return "Knight";
      case "b":
        return "Pawn";
      case "q":
        return "Queen";
      case "k":
        return "King";
    }
  })();

  return [
    "Player " + player + ",",
    "please choose a perk for your " + pieceName,
  ];
}

function getPerkText(perk) {
  switch (perk) {
    case "s": {
      return [
        "Speedster",
        "Permanently be able to move twice each turn, provided the second move is not a capture.",
      ];
    }
    case "a": {
      return [
        "Assassin",
        "Permanently be able to move twice each turn, provided the second move is a capture and the first move isn't",
      ];
    }
    case "p": {
      return [
        "Phaser",
        "Permanently be able to move through pieces, like a knight.",
      ];
    }
    case "d": {
      return [
        "Decapitator(One-time)",
        "On it's next move, it will be able to move through, and capture any of the opponent’s pieces in its line of motion.",
      ];
    }
    case "c": {
      return [
        "Cloner(One-Time)",
        "On it's next move, it will cause a copy of the piece to be where the original piece would have been, thus having two of the same pieces. ",
      ];
    }
    default: {
      return [null, null];
    }
  }
}

function getPerksList(piece) {
  switch (piece.type) {
    case "p":
      return ["s", "a", "c"];
    case "r":
      return ["s", "a", "p", "d", "c"];
    case "n":
      return ["s", "a", "c"];
    case "b":
      return ["s", "a", "p", "d", "c"];
    case "q":
      return ["s", "a", "p", "d", "c"];
    case "k":
      return ["s", "a"];
  }
}

function getStyles(settings, player, options, colorPalatte) {
  const orientation = player === 1 || options.autoTurn ? "0deg" : "180deg";
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
      transform: [{ rotate: orientation }],
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 60,
    },

    header: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
      textAlign: "center",
    },

    piece: {
      fontFamily: "Meri",
      fontSize: 80,
      color: colors.black,
      marginBottom: 20,
    },

    perksContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },

    perksContainer2: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      width: "80%",
    },

    perkDescriptionContainer: {
      marginTop: 20,
      alignItems: "center",
      flex: 1,
    },

    perkTitle: {
      fontFamily: "ELMB",
      fontSize: 25,
      color: colors.black,
    },

    perkDesc: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
      textAlign: "center",
    },

    select: {
      fontFamily: "ELM",
      fontSize: 50,
      color: colors.black,
      marginBottom: 30,
    },

    unSelect: {
      fontFamily: "ELM",
      fontSize: 50,
      color: colors.grey1,
      marginBottom: 30,
    },
  });
}
