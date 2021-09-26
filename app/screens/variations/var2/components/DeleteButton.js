import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Clickable from "../../../components/Clickable";
import colorPalatte from "../../../../config/colorPalatte";

export default function DeleteButton(props) {
  const clicked = props.clicked === "x";
  const styles = getStyles(props.settings, colorPalatte);
  const iconText = "M";
  return (
    <View style={styles.container}>
      <Clickable onPress={() => props.onPress("x")}>
        <View style={clicked ? styles.clicked : styles.unClicked}>
          <Text style={styles.iconText}>{iconText}</Text>
        </View>
      </Clickable>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },

    clicked: {
      backgroundColor: colors.grey2,
    },

    unClicked: {
      backgroundColor: colors.tertiary,
    },

    iconText: {
      fontFamily: "ElegantIcons",
      fontSize: 45,
      color: colors.black,
    },
  });
}
