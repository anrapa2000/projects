import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";
import LogCatchScreen from "../screens/LogCatchScreen";
import CatchHistoryScreen from "../screens/CatchHistoryScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";
import { RootStackParamList } from "../types/NavigationTypes";
import { SCREENS } from "../constants/screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;
  // TODO: Add a loading screen

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
            <Stack.Screen name={SCREENS.LogCatch} component={LogCatchScreen} />
            <Stack.Screen
              name={SCREENS.CatchHistory}
              component={CatchHistoryScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name={SCREENS.Welcome}
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name={SCREENS.Login} component={LoginScreen} />
            <Stack.Screen name={SCREENS.Signup} component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// TODO: Should I separate authenticated and unauthenticated stacks?
// TODO: Lazy loading screens?
