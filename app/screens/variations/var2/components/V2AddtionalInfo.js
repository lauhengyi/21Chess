import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";

function V2AdditionalInfo(props) {
  //Create Player and Opponent
  const statement = props.error;

  const styles = getStyles(props.settings, colorPalatte);
  return (
    //Include statement
    <View style={styles.container}>
      <View style={styles.notFlipped}>
        <View style={styles.statementContainer}>
          <Text style={styles.statement}>{statement}</Text>
        </View>
      </View>
    </View>
  );
}
function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      marginHorizontal: 22,
      height: "10%",
    },

    notFlipped: {
      flex: 1,
    },

    statementContainer: {
      flex: 1,
      justifyContent: "center",
    },

    statement: {
      fontFamily: "ELM",
      fontSize: 16,
      color: colors.black,
      alignSelf: "flex-end",
    },
  });
}

export default V2AdditionalInfo;
