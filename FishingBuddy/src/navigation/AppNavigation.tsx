// AppNavigator is the root navigation component for the application.
//  It sets up the navigation container and defines the main navigation structure
//  using a root stack navigator.

// Navigation comes in two main stacks:
// 1. LoginStackNavigator: Handles the authentication flow.
// 2. MainStackNavigator: Handles the main application flow after authentication.
// This structure allows for a clear separation of concerns and makes it easier to manage navigation state.

import React from "react";
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
