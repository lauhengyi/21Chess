import React, { useState } from "react";
import { StyleSheet, View, Modal } from "react-native";
import getPiece from "../../../../mechanisms/primaryFunctions/getPiece";
import getPieceText from "../../../functions/getPieceText";
import colorPalatte from "../../../../config/colorPalatte";
import PerkButton from "./PerkButton";

export default function UpgradingPopUp(props) {
  const { gameDetails, options } = props;
  const piece = getPiece(gameDetails.upgradable, gameDetails.boardLayout);
  const player = options.startingSide === gameDetails.currentSide ? 1 : 2;
  const headerText = getHeaderText(piece, player);
  const pieceText = getPieceText(piece, props.settings.theme);

  const [clickedPerk, setPerk] = useState(null);
  const perksList = getPerksList(piece);
  const styles = getStyles(props.settings, player, colorPalatte);
  return (
    <Modal visible={gameDetails.upgradable !== null} animationType={"fade"}>
      <View style={styles.background}>
        <Text style={styles.header}>{headerText}</Text>
        <Text style={styles.piece}>{pieceText}</Text>
        <View style={styles.perksContainer}>
          {perksList.map((type) => (
            <PerkButton
              clickedPerk={clickedPerk}
              onPress={setPerk}
              type={type}
              settings={props.settings}
            />
          ))}
        </View>
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

  return "Player " + player + ", choose a perk for your " + pieceName;
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

function getStyles(settings, player, colorPalatte) {
  const orientation = player === 1 ? "0deg" : "180deg";
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
      transform: [{ rotate: orientation }],
    },

    header: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },

    piece: {
      fontFamily: "Meri",
      fontSize: 40,
      color: colors.black,
    },

    perksContainer: {
      flexDirection: "row",
    },
  });
}
