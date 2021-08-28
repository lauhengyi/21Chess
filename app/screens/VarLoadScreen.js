import React, { useContext } from "react";
import OptionsScreen from "./OptionsScreen";
import Var0 from "./variations/Var0";
import Var1 from "./variations/Var1";
import Var2 from "./variations/Var2";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function VarLoadScreen({ route, navigation }) {
  const { varNum, title, header, caption } = route.params;
  const { settings } = useContext(useContext);
  const variations = [Var0, Var1, Var2];
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={"Options"}
        component={OptionsScreen}
        initialParams={{
          var: varNum,
          title: title,
          header: header,
          caption: caption,
          settings: settings,
        }}
      />
      <Stack.Screen name={String(varNum)} component={variations[varNum]} />
    </Stack.Navigator>
  );
}

export default VarLoadScreen;
