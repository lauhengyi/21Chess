import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useSettings() {
  const [loading, setLoading] = useState(true);
  //Make settings and setters
  const [masterVolume, setMasterVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(100);
  const [sfxVolume, setSfxVolume] = useState(100);
  const [theme, setTheme] = useState(0);

  const settings = {
    masterVolume: masterVolume,
    musicVolume: musicVolume,
    sfxVolume: sfxVolume,
    theme: theme,
  };

  const setters = {
    setMasterVolume: setMasterVolume,
    musicVolume: setMusicVolume,
    setSfxVolume: setSfxVolume,
    setTheme: setTheme,
  };

  useEffect(() => {
    console.log("run useEffect1");
    //Get initial settings
    async function getInit() {
      try {
        const jsonValue = await AsyncStorage.getItem("@settings");
        return jsonValue != null
          ? JSON.parse(jsonValue)
          : {
              masterVolume: 100,
              musicVolume: 100,
              sfxVolume: 100,
              theme: 1,
            };
      } catch (e) {
        throw new Error("Unable to get settings");
      }
    }

    if (!loading) {
      getInit().then((initSettings) => {
        setMasterVolume(initSettings.masterVolume);
        setMusicVolume(initSettings.musicVolume);
        setSfxVolume(initSettings.sfxVolume);
        setTheme(initSettings.theme);
      });
    }
  }, [loading]);

  useEffect(() => {
    console.log("run useEffect2");
    async function saveSettings() {
      try {
        const jsonValue = JSON.stringify(settings);
        await AsyncStorage.setItem("@settings", jsonValue);
      } catch (e) {
        throw new Error("Unable to save settings");
      }
    }
    if (!loading) {
      saveSettings();
    }
  }, [settings]);

  if (loading) {
    setLoading(false);
  }

  return [settings, setters];
}

export default useSettings;
