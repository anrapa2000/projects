import React, { useState } from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LoginStackParamList } from "../../types/navigationTypes";
import { LOGIN_SCREENS } from "../../constants/screens";
import Animated, { FadeInUp } from "react-native-reanimated";
import LoginContent from "./LoginContent";
import { loginScreenStyles as styles } from "./loginStyles";
import Background from "../../components/Background/Background";
import { sendEmailWithOtp } from "../../utils/authentication";
import { resetToLogin } from "../../navigation/RootNavigation";

type LoginScreenNavigationProp = NativeStackNavigationProp<
  LoginStackParamList,
  typeof LOGIN_SCREENS.Login
>;

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleAuthError = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      "auth/user-not-found":
        "No account found for this email. Please sign up first.",
      "auth/wrong-password": "The password is incorrect.",
      "auth/invalid-email": "The email address is not valid.",
      "auth/invalid-credential":
        "The provided credentials are invalid. Please check your email and password.",
    };

    Alert.alert(
      "Login Error",
      errorMessages[errorCode] ||
        "An unexpected error occurred. Please try again."
    );
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Missing Info", "Please enter both email and password.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.error("Auth error:", error.code);
      handleAuthError(error.code);
      resetToLogin();
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await sendEmailWithOtp(email, otp);

    navigation.navigate(LOGIN_SCREENS.OtpVerification, {
      sentOtp: otp,
      email,
      password,
    });
  };

  const navigateToSignup = () => {
    navigation.navigate(LOGIN_SCREENS.Signup);
  };

  const navigateToResetPassword = () => {
    navigation.navigate(LOGIN_SCREENS.ResetPassword);
  };

  return (
    <Background>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.container}
        >
          <Animated.View
            entering={FadeInUp.duration(800).springify()}
            style={styles.swirlContainer}
          >
            <LoginContent
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
              navigateToSignup={navigateToSignup}
              navigateToResetPassword={navigateToResetPassword}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Background>
  );
}
