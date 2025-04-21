import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { loadProfile } from "../services/profileStorage";

import LoginStackNavigator from "./LoginStackNavigator";
import MainStackNavigator from "./MainStackNavigator";
import { navigationRef } from "./RootNavigation";

const RootStack = createNativeStackNavigator();

export default function AppNavigator() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    loadProfile().then((profile) => {
      setHasProfile(!!profile);
    });
  }, []);

  if (hasProfile === null) return null; // Optional: splash screen here

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Login" component={LoginStackNavigator} />
        <RootStack.Screen name="Main" component={MainStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
