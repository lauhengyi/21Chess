import React from "react";
import { View, Switch, Text } from "react-native";

function VsComputerOptions(props) {
  const styles = props.style;
  const colors = props.colors;
  const isAutoturnDetails = props.isAutoturnDetails;
  const isFlippedDetails = props.isFlippedDetails;
  return (
    <View>
      <View style={styles.toggleOptionsContainer}>
        <Text style={styles.subHeader}>Autoturn board</Text>
        <Switch
          trackColor={{ false: colors.grey1, true: colors.black }}
          thumbColor={colors.grey2}
          ios_backgroundColor="#3e3e3e"
          onValueChange={isAutoturnDetails.onValueChange}
          value={isAutoturnDetails.value}
        />
      </View>
      <View style={styles.toggleOptionsContainer}>
        <Text
          style={
            isAutoturnDetails.value ? styles.subHeaderGreyed : styles.subHeader
          }
        >
          Flip pieces
        </Text>
        <Switch
          trackColor={{ false: colors.grey1, true: colors.black }}
          thumbColor={colors.grey2}
          ios_backgroundColor="#3e3e3e"
          onValueChange={isFlippedDetails.onValueChange}
          value={isFlippedDetails.value}
          disabled={isAutoturnDetails.value === true ? true : false}
        />
      </View>
    </View>
  );
}

export default VsComputerOptions;
