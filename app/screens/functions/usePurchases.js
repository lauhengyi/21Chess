import { useState, useEffect } from "react";
import {
  connectAsync,
  disconnectAsync,
  finishTransactionAsync,
  getBillingResponseCodeAsync,
  getProductsAsync,
  getPurchaseHistoryAsync,
  IAPResponseCode,
  purchaseItemAsync,
  setPurchaseListener,
} from "expo-in-app-purchases";
import getPurchasedThemes from "./getPurchasedThemes";

export default function usePurchases() {
  const [purchasedThemes, setPurchasedThemes] = getPurchasedThemes();

  const [loading, setLoading] = useState(false);
  const [purchasedDetails, setPurchasedDetails] = useState({
    items: [],
    history: [],
    responseCode: [],
  });
  useEffect(() => {
    async function preMount() {
      //Connect to play store
      const history = await connectAsync;

      const items = Platform.select({
        ios: [],
        android: ["3_Arctic", "4_Camo", "5_Candy"],
      });
    }
  });
}
