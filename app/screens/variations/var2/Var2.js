import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import V2GameScreen from "./V2GameScreen";
import V2ChoosingScreen from "./V2ChoosingScreen";

const Stack = createStackNavigator();
function Var2({ route, navigation }) {
  const { options, settings, saved } = route.params;
  const backgroundColor = colorPalatte[settings.theme].white;
  return (
    <View style={{ backgroundColor: backgroundColor, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!saved || !saved.gameDetails.chosen ? (
          <Stack.Screen
            name={"Choosing"}
            component={V2ChoosingScreen}
            initialParams={{
              options: options,
              saved: saved,
              settings: settings,
            }}
          />
        ) : null}
        <Stack.Screen name={"Game"} component={V2GameScreen} />
      </Stack.Navigator>
    </View>
  );
}

export default Var2;
