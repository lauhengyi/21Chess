import React from "react";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import SelectScreen from "./app/screens/SelectScreen";
import VarLoadScreen from "./app/screens/VarLoadScreen";
import SettingsScreen from "./app/screens/SettingsScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useSettings from "./app/screens/functions/useSettings";
import SettingsContext from "./app/screens/functions/SettingsContext";
import useSaved from "./app/screens/functions/useSaved";
import SavedContext from "./app/screens/functions/SavedContext";
import colorPalatte from "./app/config/colorPalatte";

// Create navigator
const Stack = createStackNavigator();

export default function App() {
  //Load settings
  const [settings, setters] = useSettings();
  //Load saves
  const [saved, setSaved] = useSaved();

  //Load fonts
  const [loaded] = useFonts({
    FogtwoNo5: require("./app/assets/fonts/FogtwoNo5.ttf"),
    ELM: require("./app/assets/fonts/ElmessiriRegular.otf"),
    ELMB: require("./app/assets/fonts/ElMessiriBold.otf"),
    Meri: require("./app/assets/fonts/MERIFONT.ttf"),
    ElegantIcons: require("./app/assets/fonts/ElegantIcons.ttf"),
    //Icons website https://www.elegantthemes.com/blog/resources/elegant-icon-font
  });
  if (!loaded) {
    return null;
  }

  const backgroundColor = colorPalatte[settings.theme].white;

  return (
    <SettingsContext.Provider value={{ settings, setters }}>
      <SavedContext.Provider value={{ saved, setSaved }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              }),
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Select" component={SelectScreen} />
            <Stack.Screen name="VarLoad" component={VarLoadScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SavedContext.Provider>
    </SettingsContext.Provider>
  );
}
