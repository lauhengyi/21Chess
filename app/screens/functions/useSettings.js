import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useSettings() {
  let initSettings;
  useEffect(() => {
    //Get initial settings
    async function getInit() {
      try {
        const jsonValue = await AsyncStorage.getItem("@settings");
        console.log("in");
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        throw new Error("Unable to get settings");
      }
    }
    getInit();
  }, []);

  //Default settings
  if (initSettings === null) {
    initSettings = {
      masterVolume: 100,
      musicVolume: 100,
      sfxVolume: 100,
      isDarkMode: false,
    };
  }

  console.log(initSettings);
  //Make settings and setters
  const [masterVolume, setMasterVolume] = useState(initSettings.masterVolume);
  const [musicVolume, setMusicVolume] = useState(initSettings.musicVolume);
  const [sfxVolume, setSfxVolume] = useState(initSettings.sfxVolume);
  const [isDarkMode, setDarkMode] = useState(initSettings.isDarkMode);
  const toggleDarkMode = () => setDarkMode((p) => !p);

  const settings = {
    masterVolume: masterVolume,
    musicVolume: musicVolume,
    sfxVolume: sfxVolume,
    isDarkMode: isDarkMode,
  };
  console.log(settings);

  const setters = {
    setMasterVolume: setMasterVolume,
    musicVolume: setMusicVolume,
    setSfxVolume: setSfxVolume,
    toggleDarkMode: toggleDarkMode,
  };

  useEffect(() => {
    async function saveSettings() {
      try {
        const jsonValue = JSON.stringify(settings);
        await AsyncStorage.setItem("@settings", jsonValue);
      } catch (e) {
        throw new Error("Unable to save settings");
      }
    }
    saveSettings();
  }, [settings]);

  return [settings, setters];
}

export default useSettings;
