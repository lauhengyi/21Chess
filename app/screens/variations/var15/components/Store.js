import React from "react";
import { View, StyleSheet } from "react-native";
import MoneyStats from "./MoneyStats";
import OrderButton from "./OrderButton";

function Store(props) {
  const ordersMap = [
    { type: "p", cost: 20 },
    { type: "n", cost: 60 },
    { type: "b", cost: 60 },
    { type: "r", cost: 100 },
    { type: "q", cost: 250 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.ordersContainer}>
        {ordersMap.map((order) => (
          <OrderButton
            key={order.type}
            type={order.type}
            cost={order.cost}
            side={props.side}
            gameDetails={props.gameDetails}
            onPress={props.chessActions}
            settings={props.settings}
          />
        ))}
      </View>
      <View style={styles.moneyContainer}>
        <MoneyStats
          gameDetails={props.gameDetails}
          side={props.side}
          settings={props.settings}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  ordersContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    paddingRight: 20,
  },

  moneyContainer: {},
});

export default Store;
