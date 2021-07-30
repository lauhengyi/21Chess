import React from "react";
import { View, Switch, Text, useColorScheme } from "react-native";
import colors from "../../config/colors";

function VsComputerOptions(props) {
  const styles = props.style;
  const autoturnDetails = props.autoturnDetails;
  const flippedDetails = props.flippedDetails;
  return (
    <View>
      <View style={styles.toggleOptionsContainer}>
        <Text style={styles.subHeader}>Autoturn board</Text>
        <Switch
          trackColor={{ false: colors.grey1, true: colors.black }}
          thumbColor={colors.grey2}
          ios_backgroundColor="#3e3e3e"
          onValueChange={autoturnDetails.onValueChange}
          value={autoturnDetails.value}
        />
      </View>
      <View style={styles.toggleOptionsContainer}>
        <Text
          style={
            autoturnDetails.value ? styles.subHeaderGreyed : styles.subHeader
          }
        >
          Flip pieces
        </Text>
        <Switch
          trackColor={{ false: colors.grey1, true: colors.black }}
          thumbColor={colors.grey2}
          ios_backgroundColor="#3e3e3e"
          onValueChange={flippedDetails.onValueChange}
          value={flippedDetails.value}
          disabled={autoturnDetails.value === true ? true : false}
        />
      </View>
    </View>
  );
}

export default VsComputerOptions;
