import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import colorPalatte from "../../../config/colorPalatte";
import usePieceChooser from "../../../mechanisms/var2/usePieceChooser";
import PieceSelector from "./components/PieceSelector";

export default function V2ChoosingScreen({ navigation, route }) {
  const { settings, options } = route.params;
  const [choosingDetails, choosingActions] = usePieceChooser();
  const styles = getStyles(settings, colorPalatte);
  const [clicked, setClicked] = useState(null);
  return (
    <View style={styles.background}>
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
