import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import colorPalatte from "../../config/colorPalatte";
import VarContainer from "./VarContainer";

function VarTypeContainer(props) {
  const varList = props.varList;
  const settings = props.settings;
  const styles = getStyles(settings, colorPalatte);
  return (
    <ScrollView contentContainerStyle={styles.variationSelectContainer}>
      {varList.map((varNum) => (
        <VarContainer key={varNum} varNum={varNum} settings={settings} />
      ))}
    </ScrollView>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return (styles = StyleSheet.create({
    variationSelectContainer: {
      alignItems: "center",
      backgroundColor: colors.white,
    },
  }));
}

export default VarTypeContainer;
