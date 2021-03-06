import React, { useContext } from "react";
import { View } from "react-native";
import OptionsScreen from "./OptionsScreen";
import Var0 from "./variations/var0/Var0";
import Var1 from "./variations/var1/Var1";
import Var2 from "./variations/var2/Var2";
import Var3 from "./variations/var3/Var3";
import Var4 from "./variations/var4/Var4";
import Var5 from "./variations/var5/Var5";
import Var6 from "./variations/var6/Var6";
import Var7 from "./variations/var7/Var7";
import Var8 from "./variations/var8/Var8";
import Var9 from "./variations/var9/Var9";
import Var10 from "./variations/var10/Var10";
import Var11 from "./variations/var11/Var11";
import Var12 from "./variations/var12/Var12";
import Var13 from "./variations/var13/Var13";
import Var14 from "./variations/var14/Var14";
import Var15 from "./variations/var15/Var15";
import Var16 from "./variations/var16/Var16";
import Var17 from "./variations/var17/Var17";
import Var18 from "./variations/var18/Var18";
import Var19 from "./variations/var19/Var19";
import Var20 from "./variations/var20/Var20";
import Var21 from "./variations/var21/Var21";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsContext from "./functions/SettingsContext";
import colorPalatte from "../config/colorPalatte";

const Stack = createStackNavigator();

function VarLoadScreen({ route }) {
  const varNum = route.params.varNum;
  const { settings } = useContext(SettingsContext);
  const variations = [
    Var0,
    Var1,
    Var2,
    Var3,
    Var4,
    Var5,
    Var6,
    Var7,
    Var8,
    Var9,
    Var10,
    Var11,
    Var12,
    Var13,
    Var14,
    Var15,
    Var16,
    Var17,
    Var18,
    Var19,
    Var20,
    Var21,
  ];
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
