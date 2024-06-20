// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screen/Home";
import DualMode from "./Screen/DualMode";
import SquadMode from "./Screen/SquadMode";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="DualMode"
          component={DualMode}
          options={{ title: "Dual Mode", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="SquadMode"
          component={SquadMode}
          options={{ title: "Squad Mode", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
