// This is the login stack navigator
// It is used to navigate through the login screens and the profile setup screens

// TODO: Code can be refactored and made more organised
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LOGIN_SCREENS } from "../constants/screens";
import ProfilePreferences from "../screens/ProfileSetup/Preferences/ProfilePreferences";
import ProfileExperience from "../screens/ProfileSetup/Experiences/ProfileExperiences";
import WelcomeScreen from "../screens/Welcome/Welcome";
import LoginScreen from "../screens/Login/LoginScreen";
import UserAccountSetup from "../screens/ProfileSetup/UserAccountSetup/UserAccountSetup";
import AppInformation from "../screens/AppInformation/AppInformation";
import ResetPasswordScreen from "../screens/ResetPassword/ResetPassword";
import LicenseUpload from "../screens/LicenseUpload/LicenseUpload";
import { OTPVerification } from "../screens/OTPVerification/OTPVerification";

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
        component={WelcomeScreen}
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
      <Stack.Screen
        name={LOGIN_SCREENS.AppInformation}
        component={AppInformation}
        options={{
          animation: "fade",
          contentStyle: { backgroundColor: "black" },
        }}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.ResetPassword}
        component={ResetPasswordScreen}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.LicenseUpload}
        component={LicenseUpload}
      />
      <Stack.Screen
        name={LOGIN_SCREENS.OtpVerification}
        component={OTPVerification}
      />
    </Stack.Navigator>
  );
}
