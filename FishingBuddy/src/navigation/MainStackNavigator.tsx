import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens";

import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import CatchHistoryScreen from "../screens/CatchHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainStackParamList } from "../types/NavigationTypes";
import LogCatchScreen from "../screens/LogCatchScreen";
import HomeDashboardScreen from "../screens/Dashboard";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.Dashboard} component={HomeDashboardScreen} />
      <Stack.Screen name={SCREENS.Home} component={HomeScreen} />
      <Stack.Screen name={SCREENS.LogCatch} component={LogCatchScreen} />
      <Stack.Screen name={SCREENS.Map} component={MapScreen} />
      <Stack.Screen
        name={SCREENS.CatchHistory}
        component={CatchHistoryScreen}
      />
      <Stack.Screen name={SCREENS.Profile} component={ProfileScreen} />
    </Stack.Navigator>
  );
}
