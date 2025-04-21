import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREENS } from "../constants/screens";

import ProfileSetupBasicScreen from "../screens/ProfileSetup/ProfileSetupBasicScreen";
import ProfileSetupPreferencesScreen from "../screens/ProfileSetup/ProfileSetupPreferencesScreen";
import ProfileSetupExperienceScreen from "../screens/ProfileSetup/ProfileSetupExperiencesScreen";
import SignupScreen from "../screens/SignUp/SignupScreen";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createNativeStackNavigator();

export default function LoginStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
        contentStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen
        name={LOGIN_SCREENS.Signup}
        component={SignupScreen}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.Login}
        component={LoginScreen}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupBasic}
        component={ProfileSetupBasicScreen}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupPreferences}
        component={ProfileSetupPreferencesScreen}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupExperience}
        component={ProfileSetupExperienceScreen}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
    </Stack.Navigator>
  );
}
