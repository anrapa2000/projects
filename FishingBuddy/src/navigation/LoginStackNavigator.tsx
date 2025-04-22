import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREENS } from "../constants/screens";
import ProfilePreferences from "../screens/ProfileSetup/Preferences/ProfilePreferences";
import ProfileExperience from "../screens/ProfileSetup/Experiences/ProfileExperiences";
import SignupScreen from "../screens/SignUp/SignupScreen";
import LoginScreen from "../screens/Login/LoginScreen";
import UserAccountSetup from "../screens/ProfileSetup/UserAccountSetup/UserAccountSetup";

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
        name={LOGIN_SCREENS.ProfileSetupUserAccount}
        component={UserAccountSetup}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupPreferences}
        component={ProfilePreferences}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ProfileSetupExperience}
        component={ProfileExperience}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
    </Stack.Navigator>
  );
}
