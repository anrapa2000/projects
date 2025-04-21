import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREENS } from "../constants/screens";

import ProfileSetupBasicScreen from "../screens/ProfileSetup/ProfileSetupBasicScreen";
import ProfileSetupPreferencesScreen from "../screens/ProfileSetup/ProfileSetupPreferencesScreen";
import ProfileSetupExperienceScreen from "../screens/ProfileSetup/ProfileSetupExperiencesScreen";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name={LOGIN_SCREENS.Signup} component={SignupScreen} />
      <Stack.Screen name={LOGIN_SCREENS.Login} component={LoginScreen} />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupBasic}
        component={ProfileSetupBasicScreen}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupPreferences}
        component={ProfileSetupPreferencesScreen}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupExperience}
        component={ProfileSetupExperienceScreen}
      />
    </Stack.Navigator>
  );
}
