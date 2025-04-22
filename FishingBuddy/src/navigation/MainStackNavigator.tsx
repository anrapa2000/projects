import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens";

import HamburgerMenu from "../screens/HamburgerMenu";
import MapScreen from "../screens/MapScreen";
import CatchHistoryScreen from "../screens/CatchHistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { MainStackParamList } from "../types/NavigationTypes";
import LogCatchScreen from "../screens/LogCatchScreen";
import HomeDashboardScreen from "../screens/Dashboard";
import TripStackNavigator from "./TripStackNavigator";
import HelpFulLinksScreen from "../screens/HelpFulLinksScreen";

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.Dashboard} component={HomeDashboardScreen} />
      <Stack.Screen name={SCREENS.HamburgerMenu} component={HamburgerMenu} />
      <Stack.Screen
        name={SCREENS.HelpFulLinks}
        component={HelpFulLinksScreen}
      />
      <Stack.Screen name={SCREENS.LogCatch} component={LogCatchScreen} />
      <Stack.Screen name={SCREENS.Map} component={MapScreen} />
      <Stack.Screen
        name={SCREENS.CatchHistory}
        component={CatchHistoryScreen}
      />
      <Stack.Screen name={SCREENS.Profile} component={ProfileScreen} />
      <Stack.Screen name="TripFlow" component={TripStackNavigator} />
    </Stack.Navigator>
  );
}
