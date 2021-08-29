import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useSaved() {
  const [loading, setLoading] = useState(true);
  //Make saves for var, options, time, and gameDetails
  const [saved, setSaved] = useState(null);

  useEffect(() => {
    //Get initial settings
    async function getInit() {
      try {
        const jsonValue = await AsyncStorage.getItem("@saved");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        throw new Error("Unable to get saved");
      }
    }

    if (!loading) {
      getInit().then((initSaved) => {
        setSaved(initSaved);
      });
    }
  }, [loading]);

  useEffect(() => {
    async function saveSaved() {
      try {
        const jsonValue = JSON.stringify(saved);
        await AsyncStorage.setItem("@saved", jsonValue);
      } catch (e) {
        throw new Error("Unable to save saved");
      }
    }
    if (!loading && saved != null) {
      saveSaved();
    }
  }, [saved]);

  if (loading) {
    setLoading(false);
  }

  return [saved, setSaved];
}

export default useSaved;
