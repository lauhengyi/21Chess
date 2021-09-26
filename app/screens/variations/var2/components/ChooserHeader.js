import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import Clickable from "../../../components/Clickable";

export default function ChooserHeader(props) {
  const styles = getStyles(props.settings, colorPalatte);
  const headerText = getHeaderText(props.choosingDetails, props.options);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{headerText}</Text>
      <Clickable
        onPress={() =>
          props.choosingActions({
            type: "submit",
          })
        }
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </Clickable>
    </View>
  );
}

function getHeaderText(choosingDetails, options) {
  let player;
  if (options.startingSide === choosingDetails.side) {
    player = 1;
  } else {
    player = 2;
  }
  return "Player " + String(player) + ", make your board";
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      height: "15%",
      backgroundColor: colors.secondary,
      marginBottom: 50,
    },
    header: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
      marginLeft: 10,
    },
    buttonContainer: {
      alignSelf: "flex-end",
      backgroundColor: colors.grey1,
      paddingHorizontal: 10,
      alignContent: "center",
      marginRight: 20,
    },
    buttonText: {
      fontFamily: "ELM",
      fontSize: 30,
      color: colors.black,
    },
  });
}
