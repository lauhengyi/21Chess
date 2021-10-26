import React from "react";
import { StyleSheet, View } from "react-native";
import colorPalatte from "../../../../../config/colorPalatte";

export default function HealthBar(props) {
  const styles = getStyles(props.settings, colorPalatte, props.health);
  return (
    <View style={styles.container}>
      <View style={styles.health} />
    </View>
  );
}

function getStyles(settings, colorPalatte, health) {
  const width = (function () {
    if (health === 1) {
      return "33%";
    } else if (health === 2) {
      return "66%";
    } else if (health === 3) {
      return "100%";
    }
  })();
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      width: 20,
      height: 5,
      borderColor: colors.black,
      borderWidth: 1,
      position: "absolute",
    },

    health: {
      flex: 1,
      width: width,
      backgroundColor: colors.accent,
    },
  });
}
