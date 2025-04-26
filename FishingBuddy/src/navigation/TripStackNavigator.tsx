// Trip stack navigator
// This is the trip stack navigator for the app
// It is used to navigate through the trip assistant screens
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TripIntro } from "../screens/TripAssistant/TripIntro/TripIntro";
import { TRIP_SCREENS } from "../constants/screens";
import { TripStackParamList } from "../types/navigationTypes";
import { TripChecklist } from "../screens/TripAssistant/CheckList/TripCheckList";
import TripLocation from "../screens/TripAssistant/Location/TripLocation";
import { TripWeather } from "../screens/TripAssistant/Weather/TripWeather";
import { TripLicense } from "../screens/TripAssistant/License/TripLicense";
import { TripEndTime } from "../screens/TripAssistant/EndTime/TripEndTime";
import TripStart from "../screens/TripAssistant/TripStart/TripStart";

const Stack = createNativeStackNavigator<TripStackParamList>();

export default function TripStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={TRIP_SCREENS.TripIntro} component={TripIntro} />
      <Stack.Screen
        name={TRIP_SCREENS.TripChecklist}
        component={TripChecklist}
      />
      <Stack.Screen name={TRIP_SCREENS.TripLocation} component={TripLocation} />
      <Stack.Screen name={TRIP_SCREENS.TripWeather} component={TripWeather} />
      <Stack.Screen name={TRIP_SCREENS.TripLicense} component={TripLicense} />
      <Stack.Screen name={TRIP_SCREENS.TripEndTime} component={TripEndTime} />
      <Stack.Screen name={TRIP_SCREENS.TripStart} component={TripStart} />
    </Stack.Navigator>
  );
}
