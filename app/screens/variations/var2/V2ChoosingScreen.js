import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import colorPalatte from "../../../config/colorPalatte";
import usePieceChooser from "../../../mechanisms/var2/usePieceChooser";
import PieceSelector from "./components/PieceSelector";
import V2AdditionalInfo from "./components/V2AddtionalInfo";
import V2Board from "./components/V2Board";
import ChooserHeader from "./components/ChooserHeader";
import useBoardMaker from "../../../mechanisms/var2/useBoardMaker";

export default function V2ChoosingScreen({ navigation, route }) {
  const { settings, options } = route.params;
  const [choosingDetails, choosingActions] = usePieceChooser();
  const styles = getStyles(settings, colorPalatte);
  const [clicked, setClicked] = useState(null);

  //Add computer to make board
  if (options.mode === 0) {
    useBoardMaker(options, choosingDetails, choosingActions);
  }
  //Turn off error after 2.5 seconds
  const timer = useRef();
  useEffect(() => {
    if (choosingDetails.error) {
      timer.current = setTimeout(() => {
        choosingActions({
          type: "clearError",
        });
      }, 2500);
    }
    return () => clearTimeout(timer.current);
  }, [choosingDetails.error]);

  //Navigate to board once completed
  useEffect(() => {
    if (choosingDetails.completed) {
      navigation.navigate("Game", {
        options: options,
        boardLayout: choosingDetails.boardLayout,
        settings: settings,
        saved: null,
      });
    }
  }, [choosingDetails.completed]);
  return (
    <View style={styles.background}>
      <ChooserHeader
        choosingDetails={choosingDetails}
        choosingActions={choosingActions}
        options={options}
        settings={settings}
      />
      <V2Board
        choosingDetails={choosingDetails}
        choosingActions={choosingActions}
        type={clicked}
        settings={settings}
      />
      <V2AdditionalInfo error={choosingDetails.error} settings={settings} />
      <PieceSelector
        settings={settings}
        clicked={clicked}
        onPress={setClicked}
        onSubmit={choosingActions}
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
