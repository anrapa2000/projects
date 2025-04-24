import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginStackNavigator from "./LoginStackNavigator";
import MainStackNavigator from "./MainStackNavigator";
import { navigationRef } from "./RootNavigation";

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Entry" component={LoginStackNavigator} />
        <RootStack.Screen name="Main" component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
