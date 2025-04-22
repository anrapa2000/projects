import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TripIntroScreen } from "../screens/TripFlow/TripIntroScreen";
import { TRIP_SCREENS } from "../constants/screens";
import { TripStackParamList } from "../types/NavigationTypes";
import { TripChecklistScreen } from "../screens/TripFlow/TripCheckList";
import TripLocationScreen from "../screens/TripFlow/TripLocationScreen";
import { TripWeatherScreen } from "../screens/TripFlow/TripWeatherScreen";
import { TripLicenseScreen } from "../screens/TripFlow/TripLicenseScreen";
import { TripEndTimeScreen } from "../screens/TripFlow/TripEndTimeScreen";
import { TripStartScreen } from "../screens/TripFlow/TripStartScreen";

const Stack = createNativeStackNavigator<TripStackParamList>();

export default function TripStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={TRIP_SCREENS.TripIntro} component={TripIntroScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripChecklist} component={TripChecklistScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripLocation} component={TripLocationScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripWeather} component={TripWeatherScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripLicense} component={TripLicenseScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripEndTime} component={TripEndTimeScreen} />
      <Stack.Screen name={TRIP_SCREENS.TripStart} component={TripStartScreen} />
    </Stack.Navigator>
  );
}
