import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREENS } from "../constants/screens";

import HamburgerMenu from "../screens/HamburgerMenu/HamburgerMenu";
import MapScreen from "../screens/Map/MapScreen";
import CatchHistoryScreen from "../screens/CatchHistory/CatchHistoryScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { MainStackParamList } from "../types/navigationTypes";
import LogCatchScreen from "../screens/LogCatch/LogCatchScreen";
import HomeDashboardScreen from "../screens/Dashboard/Dashboard";
import TripStackNavigator from "./TripStackNavigator";
import HelpFulLinksScreen from "../screens/HelpfulLinks/HelpFulLinksScreen";

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
