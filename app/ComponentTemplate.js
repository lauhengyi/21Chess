import React from "react";
import { StyleSheet, View } from "react-native";
import colorPalatte from "./config/colorPalatte";

export default function ComponentTemplate(props) {
  const styles = getStyles(props.settings, colorPalatte);
  return <View></View>;
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({});
}
