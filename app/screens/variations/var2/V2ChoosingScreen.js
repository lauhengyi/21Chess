import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colorPalatte from "../../../config/colorPalatte";
import usePieceChooser from "../../../mechanisms/var2/usePieceChooser";
import PieceSelector from "./components/PieceSelector";
import V2Board from "./components/V2Board";

export default function V2ChoosingScreen({ navigation, route }) {
  const { settings, options } = route.params;
  const [choosingDetails, choosingActions] = usePieceChooser();
  const styles = getStyles(settings, colorPalatte);
  const [clicked, setClicked] = useState(null);
  return (
    <View style={styles.background}>
      <V2Board
        choosingDetails={choosingDetails}
        choosingActions={choosingActions}
        type={clicked}
        settings={settings}
      />
      <PieceSelector
        settings={settings}
        clicked={clicked}
        onPress={setClicked}
        choosingDetails={choosingDetails}
      />
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    background: {
      flex: 1,
      backgroundColor: colors.white,
      justifyContent: "flex-end",
    },
  });
}
