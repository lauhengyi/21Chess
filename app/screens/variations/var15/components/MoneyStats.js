import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colorPalatte from "../../../../config/colorPalatte";
import getRevenue from "../../../../mechanisms/var15/functions/getRevenue";

export default function MoneyStats(props) {
  const styles = getStyles(props.settings, colorPalatte);
  const side = props.side;
  const { whiteMoney, blackMoney, boardLayout } = props.gameDetails;
  const moneyText = side ? "$" + whiteMoney : "$" + blackMoney;
  const revenueText = "$" + getRevenue(boardLayout, side) + "/T";

  return (
    <View style={styles.container}>
      <View style={styles.moneyBorder}>
        <Text style={styles.moneyText}>{moneyText}</Text>
      </View>
      <Text style={styles.revenueText}>{revenueText}</Text>
    </View>
  );
}

function getStyles(settings, colorPalatte) {
  const colors = colorPalatte[settings.theme];
  return StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
    },

    moneyBorder: {
      borderWidth: 5,
      borderColor: colors.grey1,
      width: 102,
      backgroundColor: colors.primary,
      alignItems: "center",
      justifyContent: "center",
    },

    moneyText: {
      fontFamily: "ELM",
      fontSize: 20,
      color: colors.black,
    },

    revenueText: {
      fontFamily: "ELM",
      fontSize: 15,
      color: colors.black,
    },
  });
}
