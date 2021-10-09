import getOrders from "./getOrders";
import getPrice from "./getPrice";

export default function getAffordableOrders(gameDetails) {
  const money = gameDetails.currentSide
    ? gameDetails.whiteMoney
    : gameDetails.blackMoney;
  let orders = [];
  const typesMap = ["p", "n", "b", "r", "q"];
  for (const type of typesMap) {
    //If affordable
    if (money >= getPrice(type)) {
      orders.concat(getOrders(gameDetails, type));
    }
  }
  return orders;
}
