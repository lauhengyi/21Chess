import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import colorPalatte from "../config/colorPalatte";

function SettingsScreen({ navigation, route }) {
  const settings = route.params.settings;
  const setters = route.params.setters;
  console.log({ settings, setters });
  const [styles, colors] = getStyles(settings, colorPalatte);
  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.settings}></View>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  const styles = StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
    },

    headerContainer: {
      alignItems: "center",
      marginTop: 70,
    },

    header: {
      fontFamily: "FogtwoNo5",
      fontSize: 70,
    },
  });
  return [styles, color];
}

export default SettingsScreen;
