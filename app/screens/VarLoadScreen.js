import React, { useContext } from "react";
import { View } from "react-native";
import OptionsScreen from "./OptionsScreen";
import Var0 from "./variations/var0/Var0";
import Var1 from "./variations/var1/Var1";
import Var2 from "./variations/var2/Var2";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsContext from "./functions/SettingsContext";
import colorPalatte from "../config/colorPalatte";

const Stack = createStackNavigator();

function VarLoadScreen({ route, navigation }) {
  const varNum = route.params.varNum;
  const { settings } = useContext(SettingsContext);
  const variations = [Var0, Var1, Var2];
  const backgroundColor = colorPalatte[settings.theme].white;
  return (
    <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={"Options"}
          component={OptionsScreen}
          initialParams={{
            varNum: varNum,
            settings: settings,
          }}
        />
        <Stack.Screen name={String(varNum)} component={variations[varNum]} />
      </Stack.Navigator>
    </View>
  );
}

export default VarLoadScreen;
